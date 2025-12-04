'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  location: string
  description: string
  published: boolean
  images: Array<{
    id: string
    url: string
    alt: string | null
    order: number
  }>
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [showImageForm, setShowImageForm] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [isAddingImage, setIsAddingImage] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'terrasse',
    location: '',
    description: '',
    published: false,
  })

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/admin/projects/${resolvedParams.id}`)
        if (!response.ok) throw new Error('Projet non trouvé')
        const data = await response.json()
        setProject(data)
        setFormData({
          title: data.title,
          slug: data.slug,
          category: data.category,
          location: data.location || '',
          description: data.description,
          published: data.published,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [resolvedParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resolvedParams) return
    
    setError('')
    setIsSaving(true)

    try {
      const response = await fetch(`/api/admin/projects/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!resolvedParams) return

    setUploadProgress('Upload en cours...')
    setError('')

    try {
      // Upload file
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json()
        throw new Error(error.error || 'Erreur lors de l\'upload')
      }

      const { url } = await uploadResponse.json()

      // Add image to project
      const response = await fetch(`/api/admin/projects/${resolvedParams.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alt: file.name }),
      })

      if (!response.ok) throw new Error('Erreur lors de l\'ajout')

      const newImage = await response.json()
      setProject(prev => prev ? { ...prev, images: [...prev.images, newImage] } : null)
      
      return newImage
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'upload')
      throw err
    }
  }

  const handleMultipleFileUpload = async (files: File[]) => {
    if (!resolvedParams || files.length === 0) return

    setUploadProgress(`Upload de ${files.length} image(s) en cours...`)
    setError('')

    try {
      let successCount = 0
      
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Upload de l'image ${i + 1}/${files.length}...`)
        await handleFileUpload(files[i])
        successCount++
      }
      
      setUploadProgress(`✓ ${successCount} image(s) ajoutée(s) avec succès !`)
      setTimeout(() => setUploadProgress(null), 3000)
    } catch (err) {
      setUploadProgress(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      setError('Veuillez déposer des fichiers images')
      return
    }

    // Upload all images
    handleMultipleFileUpload(imageFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
      handleMultipleFileUpload(imageFiles)
    }
  }

  const handleAddImage = async () => {
    if (!resolvedParams || !imageUrl.trim()) return
    
    setIsAddingImage(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/projects/${resolvedParams.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageUrl, alt: imageAlt }),
      })

      if (!response.ok) throw new Error('Erreur lors de l\'ajout')

      const newImage = await response.json()
      setProject(prev => prev ? { ...prev, images: [...prev.images, newImage] } : null)
      setImageUrl('')
      setImageAlt('')
      setShowImageForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setIsAddingImage(false)
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!resolvedParams) return
    if (!confirm('Supprimer cette image ?')) return

    try {
      const response = await fetch(`/api/admin/projects/${resolvedParams.id}/images/${imageId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Erreur lors de la suppression')

      setProject(prev => prev ? {
        ...prev,
        images: prev.images.filter(img => img.id !== imageId)
      } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de suppression')
    }
  }

  const handleDelete = async () => {
    if (!resolvedParams) return
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return

    try {
      const response = await fetch(`/api/admin/projects/${resolvedParams.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de suppression')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-gray-600 mb-4">Projet non trouvé</p>
          <Link href="/admin/projects" className="text-primary-600 hover:text-primary-700">
            Retour aux projets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/admin/projects"
            className="text-primary-600 hover:text-primary-700 text-sm mb-2 inline-block"
          >
            ← Retour aux projets
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Modifier le projet</h1>
          <p className="text-gray-600">{project.title}</p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Titre du projet *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              URL (slug) *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">/realisations/</span>
              <input
                type="text"
                id="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="terrasse">Terrasse</option>
              <option value="jardin">Jardin</option>
              <option value="elagage">Élagage</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Localisation
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Images Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Images ({project.images.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowImageForm(!showImageForm)}
                className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
              >
                {showImageForm ? 'Fermer le formulaire' : 'Ou ajouter une URL'}
              </button>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all mb-4 ${
                isDragging
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-6xl mb-3">📸</div>
                <p className="text-gray-700 font-medium mb-1">
                  Glissez-déposez des images ici
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  ou cliquez pour sélectionner plusieurs fichiers
                </p>
                <p className="text-xs text-gray-400">
                  JPG, PNG, WEBP ou AVIF • Maximum 5 MB par image
                </p>
              </label>
              {uploadProgress && (
                <div className="mt-4 text-sm font-medium text-primary-600">
                  {uploadProgress}
                </div>
              )}
            </div>

            {/* URL Form (Optional) */}
            {showImageForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://exemple.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texte alternatif (description)
                  </label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Description de l'image"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddImage}
                  disabled={!imageUrl.trim() || isAddingImage}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingImage ? 'Ajout...' : 'Ajouter l\'image'}
                </button>
              </div>
            )}

            {/* Images Grid */}
            {project.images.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                Aucune image pour ce projet. Ajoutez-en en glissant une image ci-dessus !
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.alt || ''}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.id)}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-all"
                      >
                        Supprimer
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Published */}
          <div className="flex items-center gap-3 border-t pt-6">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publier le projet (visible sur le site public)
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
            <Link
              href="/admin/projects"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Supprimer
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

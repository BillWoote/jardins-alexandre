'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/RichTextEditor'

interface Settings {
  siteName: string
  siteSlogan: string
  phone: string
  email: string
  address: string
  serviceArea: string
  description: string
  serviceTerrasseImage: string
  serviceJardinImage: string
  serviceElagageImage: string
  homeTerrasseImage: string
  homeJardinImage: string
  homeElagageImage: string
  homeEntretienImage: string
  homeTerrasseTitle: string
  homeJardinTitle: string
  homeElagageTitle: string
  homeEntretienTitle: string
  homeTerrasseDesc: string
  homeJardinDesc: string
  homeElagageDesc: string
  homeEntretienDesc: string
  homeServicesSubtitle: string
  servicesPageTitle: string
  servicesPageSubtitle: string
  serviceTerrasseTitle: string
  serviceTerrasseContent: string
  serviceJardinTitle: string
  serviceJardinContent: string
  serviceElagageTitle: string
  serviceElagageContent: string
  serviceEntretienTitle: string
  serviceEntretienContent: string
  serviceEntretienImage: string
  // Page À propos - Notre Histoire
  aboutHistoryImage: string
  aboutHistoryTitle: string
  aboutHistoryContent: string
  // Page À propos - Nos Valeurs (4 tuiles)
  aboutValue1Image: string
  aboutValue1Title: string
  aboutValue1Desc: string
  aboutValue2Image: string
  aboutValue2Title: string
  aboutValue2Desc: string
  aboutValue3Image: string
  aboutValue3Title: string
  aboutValue3Desc: string
  aboutValue4Image: string
  aboutValue4Title: string
  aboutValue4Desc: string
  // Page À propos - Notre Expertise
  aboutExpertiseTitle: string
  aboutExpertiseContent: string
  // Page Réalisations
  realisationsSlogan: string
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const [isDragging, setIsDragging] = useState<{[key: string]: boolean}>({})

  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteSlogan: '',
    phone: '',
    email: '',
    address: '',
    serviceArea: '',
    description: '',
    serviceTerrasseImage: '',
    serviceJardinImage: '',
    serviceElagageImage: '',
    homeTerrasseImage: '',
    homeJardinImage: '',
    homeElagageImage: '',
    homeEntretienImage: '',
    homeTerrasseTitle: '',
    homeJardinTitle: '',
    homeElagageTitle: '',
    homeEntretienTitle: '',
    homeTerrasseDesc: '',
    homeJardinDesc: '',
    homeElagageDesc: '',
    homeEntretienDesc: '',
    homeServicesSubtitle: '',
    servicesPageTitle: '',
    servicesPageSubtitle: '',
    serviceTerrasseTitle: '',
    serviceTerrasseContent: '',
    serviceJardinTitle: '',
    serviceJardinContent: '',
    serviceElagageTitle: '',
    serviceElagageContent: '',
    serviceEntretienTitle: '',
    serviceEntretienContent: '',
    serviceEntretienImage: '',
    // Page À propos - Notre Histoire
    aboutHistoryImage: '',
    aboutHistoryTitle: '',
    aboutHistoryContent: '',
    // Page À propos - Nos Valeurs (4 tuiles)
    aboutValue1Image: '',
    aboutValue1Title: '',
    aboutValue1Desc: '',
    aboutValue2Image: '',
    aboutValue2Title: '',
    aboutValue2Desc: '',
    aboutValue3Image: '',
    aboutValue3Title: '',
    aboutValue3Desc: '',
    aboutValue4Image: '',
    aboutValue4Title: '',
    aboutValue4Desc: '',
    // Page À propos - Notre Expertise
    aboutExpertiseTitle: '',
    aboutExpertiseContent: '',
    // Page Réalisations
    realisationsSlogan: '',
  })

  // Fonction pour charger les paramètres depuis le serveur
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (!response.ok) throw new Error('Erreur de chargement')
      const data = await response.json()
      
      // Convert settings array to object
      const settingsObj: Settings = {
        siteName: data.find((s: any) => s.key === 'site_name')?.value || '',
        siteSlogan: data.find((s: any) => s.key === 'site_slogan')?.value || '',
        phone: data.find((s: any) => s.key === 'contact_phone')?.value || '',
        email: data.find((s: any) => s.key === 'contact_email')?.value || '',
        address: data.find((s: any) => s.key === 'address')?.value || '',
        serviceArea: data.find((s: any) => s.key === 'serviceArea')?.value || '',
        description: data.find((s: any) => s.key === 'description')?.value || '',
        serviceTerrasseImage: data.find((s: any) => s.key === 'serviceTerrasseImage')?.value || '/accueil-terrasse.avif',
        serviceJardinImage: data.find((s: any) => s.key === 'serviceJardinImage')?.value || '/accueil-jardin.avif',
        serviceElagageImage: data.find((s: any) => s.key === 'serviceElagageImage')?.value || '/accueil-elagage.avif',
        homeTerrasseImage: data.find((s: any) => s.key === 'homeTerrasseImage')?.value || '/accueil-terrasse.avif',
        homeJardinImage: data.find((s: any) => s.key === 'homeJardinImage')?.value || '/accueil-jardin.avif',
        homeElagageImage: data.find((s: any) => s.key === 'homeElagageImage')?.value || '/accueil-elagage.avif',
        homeEntretienImage: data.find((s: any) => s.key === 'homeEntretienImage')?.value || '/accueil-jardin.avif',
        homeTerrasseTitle: data.find((s: any) => s.key === 'homeTerrasseTitle')?.value || 'Terrasses Urbaines',
        homeJardinTitle: data.find((s: any) => s.key === 'homeJardinTitle')?.value || 'Jardins & Aménagements',
        homeElagageTitle: data.find((s: any) => s.key === 'homeElagageTitle')?.value || 'Élagage & Entretien',
        homeEntretienTitle: data.find((s: any) => s.key === 'homeEntretienTitle')?.value || 'Entretien',
        homeTerrasseDesc: data.find((s: any) => s.key === 'homeTerrasseDesc')?.value || 'Aménagement et création de terrasses élégantes en milieu urbain',
        homeJardinDesc: data.find((s: any) => s.key === 'homeJardinDesc')?.value || 'Conception et réalisation de jardins sur mesure',
        homeElagageDesc: data.find((s: any) => s.key === 'homeElagageDesc')?.value || 'Taille et entretien professionnel de vos arbres',
        homeEntretienDesc: data.find((s: any) => s.key === 'homeEntretienDesc')?.value || 'Entretien régulier de vos espaces verts',
        homeServicesSubtitle: data.find((s: any) => s.key === 'homeServicesSubtitle')?.value || 'Des services professionnels pour tous vos projets d\'aménagement extérieur',
        servicesPageTitle: data.find((s: any) => s.key === 'servicesPageTitle')?.value || 'Nos Services',
        servicesPageSubtitle: data.find((s: any) => s.key === 'servicesPageSubtitle')?.value || 'Des solutions complètes pour tous vos projets d\'aménagement extérieur',
        serviceTerrasseTitle: data.find((s: any) => s.key === 'serviceTerrasseTitle')?.value || 'Terrasses Urbaines',
        serviceTerrasseContent: data.find((s: any) => s.key === 'serviceTerrasseContent')?.value || '<p>Création et aménagement de terrasses sur mesure...</p>',
        serviceJardinTitle: data.find((s: any) => s.key === 'serviceJardinTitle')?.value || 'Jardins & Aménagements',
        serviceJardinContent: data.find((s: any) => s.key === 'serviceJardinContent')?.value || '<p>Conception et réalisation de jardins...</p>',
        serviceElagageTitle: data.find((s: any) => s.key === 'serviceElagageTitle')?.value || 'Élagage & Entretien',
        serviceElagageContent: data.find((s: any) => s.key === 'serviceElagageContent')?.value || '<p>Taille et entretien professionnel...</p>',
        serviceEntretienTitle: data.find((s: any) => s.key === 'serviceEntretienTitle')?.value || 'Entretien',
        serviceEntretienContent: data.find((s: any) => s.key === 'serviceEntretienContent')?.value || '<p>Services d\'entretien régulier de vos espaces verts...</p>',
        serviceEntretienImage: data.find((s: any) => s.key === 'serviceEntretienImage')?.value || '/accueil-jardin.avif',
        // Page À propos - Notre Histoire
        aboutHistoryImage: data.find((s: any) => s.key === 'aboutHistoryImage')?.value || '/accueil-LOGO.avif',
        aboutHistoryTitle: data.find((s: any) => s.key === 'aboutHistoryTitle')?.value || 'Notre Histoire',
        aboutHistoryContent: data.find((s: any) => s.key === 'aboutHistoryContent')?.value || '',
        // Page À propos - Nos Valeurs
        aboutValue1Image: data.find((s: any) => s.key === 'aboutValue1Image')?.value || '',
        aboutValue1Title: data.find((s: any) => s.key === 'aboutValue1Title')?.value || 'Créativité & Sur-mesure',
        aboutValue1Desc: data.find((s: any) => s.key === 'aboutValue1Desc')?.value || 'Chaque projet est conçu selon vos goûts et vos contraintes pour créer un espace qui vous ressemble.',
        aboutValue2Image: data.find((s: any) => s.key === 'aboutValue2Image')?.value || '',
        aboutValue2Title: data.find((s: any) => s.key === 'aboutValue2Title')?.value || 'Respect de l\'environnement',
        aboutValue2Desc: data.find((s: any) => s.key === 'aboutValue2Desc')?.value || 'Nous privilégions des solutions écologiques et des végétaux adaptés au climat local.',
        aboutValue3Image: data.find((s: any) => s.key === 'aboutValue3Image')?.value || '',
        aboutValue3Title: data.find((s: any) => s.key === 'aboutValue3Title')?.value || 'Qualité & Professionnalisme',
        aboutValue3Desc: data.find((s: any) => s.key === 'aboutValue3Desc')?.value || 'Un travail soigné, des matériaux de qualité et le respect des délais convenus.',
        aboutValue4Image: data.find((s: any) => s.key === 'aboutValue4Image')?.value || '',
        aboutValue4Title: data.find((s: any) => s.key === 'aboutValue4Title')?.value || 'Accompagnement personnalisé',
        aboutValue4Desc: data.find((s: any) => s.key === 'aboutValue4Desc')?.value || 'Nous vous conseillons à chaque étape, de la conception à la réalisation de votre projet.',
        // Page À propos - Notre Expertise
        aboutExpertiseTitle: data.find((s: any) => s.key === 'aboutExpertiseTitle')?.value || 'Notre Expertise',
        aboutExpertiseContent: data.find((s: any) => s.key === 'aboutExpertiseContent')?.value || '<ul><li>Conception paysagère et plans d\'aménagement</li><li>Maîtrise des techniques de plantation et d\'arrosage</li></ul>',
        // Page Réalisations
        realisationsSlogan: data.find((s: any) => s.key === 'realisationsSlogan')?.value || 'Découvrez notre portfolio de projets d\'aménagements extérieurs',
      }
      setSettings(settingsObj)
    } catch (err) {
      setError('Erreur de chargement des paramètres')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleFileUpload = async (
    file: File, 
    imageKey: 'serviceTerrasseImage' | 'serviceJardinImage' | 'serviceElagageImage' | 'serviceEntretienImage' | 'homeTerrasseImage' | 'homeJardinImage' | 'homeElagageImage' | 'homeEntretienImage' | 'aboutHistoryImage' | 'aboutValue1Image' | 'aboutValue2Image' | 'aboutValue3Image' | 'aboutValue4Image'
  ) => {
    try {
      setUploadProgress({ ...uploadProgress, [imageKey]: 0 })
      
      // Upload file
      const formData = new FormData()
      formData.append('file', file)
      
      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!uploadResponse.ok) {
        throw new Error('Erreur lors de l\'upload')
      }
      
      const { url } = await uploadResponse.json()
      
      // Update settings
      setSettings({ ...settings, [imageKey]: url })
      setUploadProgress({ ...uploadProgress, [imageKey]: 100 })
      
      setTimeout(() => {
        setUploadProgress({ ...uploadProgress, [imageKey]: 0 })
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
      setUploadProgress({ ...uploadProgress, [imageKey]: 0 })
    }
  }

  const handleDrop = (
    e: React.DragEvent, 
    imageKey: 'serviceTerrasseImage' | 'serviceJardinImage' | 'serviceElagageImage' | 'serviceEntretienImage' | 'homeTerrasseImage' | 'homeJardinImage' | 'homeElagageImage' | 'homeEntretienImage' | 'aboutHistoryImage' | 'aboutValue1Image' | 'aboutValue2Image' | 'aboutValue3Image' | 'aboutValue4Image'
  ) => {
    e.preventDefault()
    setIsDragging({ ...isDragging, [imageKey]: false })
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file, imageKey)
    }
  }

  const handleDragOver = (e: React.DragEvent, imageKey: string) => {
    e.preventDefault()
    setIsDragging({ ...isDragging, [imageKey]: true })
  }

  const handleDragLeave = (e: React.DragEvent, imageKey: string) => {
    e.preventDefault()
    setIsDragging({ ...isDragging, [imageKey]: false })
  }

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>, 
    imageKey: 'serviceTerrasseImage' | 'serviceJardinImage' | 'serviceElagageImage' | 'serviceEntretienImage' | 'homeTerrasseImage' | 'homeJardinImage' | 'homeElagageImage' | 'homeEntretienImage' | 'aboutHistoryImage' | 'aboutValue1Image' | 'aboutValue2Image' | 'aboutValue3Image' | 'aboutValue4Image'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file, imageKey)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      // Recharger les paramètres depuis le serveur pour afficher les valeurs à jour
      await fetchSettings()
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSaving(false)
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/admin"
            className="text-primary-600 hover:text-primary-700 text-sm mb-2 inline-block"
          >
            ← Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du site</h1>
          <p className="text-gray-600">Gérer les informations générales</p>
        </div>
      </header>

      {/* Form with Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-8 bg-white rounded-lg shadow p-4 space-y-1">
              <h2 className="font-semibold text-gray-900 mb-3 px-3">Navigation</h2>
              {[
                { id: 'general', label: 'Informations générales' },
                { id: 'accueil', label: 'Page Accueil' },
                { id: 'services', label: 'Page Services' },
                { id: 'realisations', label: 'Page Réalisations' },
                { id: 'apropos', label: 'Page À propos' },
              ].map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Form */}
          <div className="flex-1">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
              ✓ Paramètres enregistrés avec succès !
            </div>
          )}

          {/* Informations Générales Section */}
          <div id="general" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Informations générales</h2>
          
          {/* Site Name */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
              Nom du site
            </label>
            <input
              type="text"
              id="siteName"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Les Jardins d'Alexandre"
            />
          </div>

          {/* Site Slogan */}
          <div>
            <label htmlFor="siteSlogan" className="block text-sm font-medium text-gray-700 mb-2">
              Slogan
            </label>
            <input
              type="text"
              id="siteSlogan"
              value={settings.siteSlogan}
              onChange={(e) => setSettings({ ...settings, siteSlogan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Votre jardin, notre passion"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description du site
            </label>
            <RichTextEditor
              value={settings.description}
              onChange={(value) => setSettings({ ...settings, description: value })}
              placeholder="Paysagiste professionnel spécialisé en aménagement de terrasses..."
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
            
            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="01 23 45 67 89"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="contact@jardinsalexandre.fr"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse de la société
              </label>
              <textarea
                id="address"
                rows={3}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="123 Rue du Jardin&#10;75000 Paris"
              />
            </div>

            {/* Service Area */}
            <div>
              <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700 mb-2">
                Zone d'intervention
              </label>
              <textarea
                id="serviceArea"
                rows={2}
                value={settings.serviceArea}
                onChange={(e) => setSettings({ ...settings, serviceArea: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Paris et Île-de-France"
              />
            </div>
          </div>

          </div>

          {/* Page Accueil Section */}
          <div id="accueil" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Page Accueil</h2>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Textes de la page d'accueil</h3>
            
            {/* Home Services Subtitle */}
            <div className="mb-6">
              <label htmlFor="homeServicesSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre section "Nos services"
              </label>
              <RichTextEditor
                value={settings.homeServicesSubtitle}
                onChange={(value) => setSettings({ ...settings, homeServicesSubtitle: value })}
                placeholder="Des services professionnels pour tous vos projets d'aménagement extérieur"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tuiles de la page d'accueil</h3>
            <p className="text-sm text-gray-600 mb-6">
              Ces tuiles apparaissent dans la section "Nos services" sur la page d'accueil
            </p>
            
            {/* Tuile 1 - Terrasses */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Tuile 1 - Terrasses</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'homeTerrasseImage')}
                onDragOver={(e) => handleDragOver(e, 'homeTerrasseImage')}
                onDragLeave={(e) => handleDragLeave(e, 'homeTerrasseImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.homeTerrasseImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.homeTerrasseImage ? (
                  <div className="space-y-2">
                    <img 
                      src={settings.homeTerrasseImage} 
                      alt="Terrasse" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.homeTerrasseImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeTerrasseImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeTerrasseImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.homeTerrasseImage > 0 && uploadProgress.homeTerrasseImage < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${uploadProgress.homeTerrasseImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <label htmlFor="homeTerrasseTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="homeTerrasseTitle"
                value={settings.homeTerrasseTitle}
                onChange={(e) => setSettings({ ...settings, homeTerrasseTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="Terrasses Urbaines"
              />
              
              {/* Description */}
              <label htmlFor="homeTerrasseDesc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <RichTextEditor
                value={settings.homeTerrasseDesc}
                onChange={(value) => setSettings({ ...settings, homeTerrasseDesc: value })}
                placeholder="Aménagement et création de terrasses élégantes en milieu urbain"
              />
            </div>

            {/* Tuile 2 - Jardins */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Tuile 2 - Jardins</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'homeJardinImage')}
                onDragOver={(e) => handleDragOver(e, 'homeJardinImage')}
                onDragLeave={(e) => handleDragLeave(e, 'homeJardinImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.homeJardinImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.homeJardinImage ? (
                  <div className="space-y-2">
                    <img 
                      src={settings.homeJardinImage} 
                      alt="Jardin" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.homeJardinImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeJardinImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeJardinImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.homeJardinImage > 0 && uploadProgress.homeJardinImage < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${uploadProgress.homeJardinImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <label htmlFor="homeJardinTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="homeJardinTitle"
                value={settings.homeJardinTitle}
                onChange={(e) => setSettings({ ...settings, homeJardinTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="Jardins & Aménagements"
              />
              
              {/* Description */}
              <label htmlFor="homeJardinDesc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <RichTextEditor
                value={settings.homeJardinDesc}
                onChange={(value) => setSettings({ ...settings, homeJardinDesc: value })}
                placeholder="Conception et réalisation de jardins sur mesure"
              />
            </div>

            {/* Tuile 3 - Élagage */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Tuile 3 - Élagage</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'homeElagageImage')}
                onDragOver={(e) => handleDragOver(e, 'homeElagageImage')}
                onDragLeave={(e) => handleDragLeave(e, 'homeElagageImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.homeElagageImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.homeElagageImage ? (
                  <div className="space-y-2">
                    <img 
                      src={settings.homeElagageImage} 
                      alt="Élagage" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.homeElagageImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeElagageImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeElagageImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.homeElagageImage > 0 && uploadProgress.homeElagageImage < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${uploadProgress.homeElagageImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <label htmlFor="homeElagageTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="homeElagageTitle"
                value={settings.homeElagageTitle}
                onChange={(e) => setSettings({ ...settings, homeElagageTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="Élagage & Entretien"
              />
              
              {/* Description */}
              <label htmlFor="homeElagageDesc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <RichTextEditor
                value={settings.homeElagageDesc}
                onChange={(value) => setSettings({ ...settings, homeElagageDesc: value })}
                placeholder="Taille et entretien professionnel de vos arbres"
              />
            </div>

            {/* Tuile 4 - Entretien */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Tuile 4 - Entretien</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'homeEntretienImage')}
                onDragOver={(e) => handleDragOver(e, 'homeEntretienImage')}
                onDragLeave={(e) => handleDragLeave(e, 'homeEntretienImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.homeEntretienImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.homeEntretienImage ? (
                  <div className="space-y-2">
                    <img 
                      src={settings.homeEntretienImage} 
                      alt="Entretien" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.homeEntretienImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeEntretienImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'homeEntretienImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.homeEntretienImage > 0 && uploadProgress.homeEntretienImage < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-primary-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${uploadProgress.homeEntretienImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <label htmlFor="homeEntretienTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="homeEntretienTitle"
                value={settings.homeEntretienTitle}
                onChange={(e) => setSettings({ ...settings, homeEntretienTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="Entretien"
              />
              
              {/* Description */}
              <label htmlFor="homeEntretienDesc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <RichTextEditor
                value={settings.homeEntretienDesc}
                onChange={(value) => setSettings({ ...settings, homeEntretienDesc: value })}
                placeholder="Entretien régulier de vos espaces verts"
              />
            </div>
          </div>
          </div>

          {/* Page Services Section */}
          <div id="services" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Page Services</h2>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenus de la page Services</h3>
            
            {/* Services Page Title */}
            <div className="mb-6">
              <label htmlFor="servicesPageTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la page Services
              </label>
              <input
                type="text"
                id="servicesPageTitle"
                value={settings.servicesPageTitle}
                onChange={(e) => setSettings({ ...settings, servicesPageTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Nos Services"
              />
            </div>

            {/* Services Page Subtitle */}
            <div className="mb-6">
              <label htmlFor="servicesPageSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre de la page Services
              </label>
              <RichTextEditor
                value={settings.servicesPageSubtitle}
                onChange={(value) => setSettings({ ...settings, servicesPageSubtitle: value })}
                placeholder="Des solutions complètes pour tous vos projets d'aménagement extérieur"
              />
            </div>

            {/* Service Terrasse Title & Content */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Service 1 - Terrasses</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'serviceTerrasseImage')}
                onDragOver={(e) => handleDragOver(e, 'serviceTerrasseImage')}
                onDragLeave={(e) => handleDragLeave(e, 'serviceTerrasseImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.serviceTerrasseImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.serviceTerrasseImage ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.serviceTerrasseImage} 
                      alt="Terrasse" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.serviceTerrasseImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceTerrasseImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceTerrasseImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.serviceTerrasseImage > 0 && uploadProgress.serviceTerrasseImage < 100 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.serviceTerrasseImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="serviceTerrasseTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="serviceTerrasseTitle"
                value={settings.serviceTerrasseTitle}
                onChange={(e) => setSettings({ ...settings, serviceTerrasseTitle: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Terrasses Urbaines"
              />
              <label htmlFor="serviceTerrasseContent" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu "Nos prestations"
              </label>
              <RichTextEditor
                value={settings.serviceTerrasseContent}
                onChange={(value) => setSettings({ ...settings, serviceTerrasseContent: value })}
                placeholder="Détails des prestations pour les terrasses..."
              />
            </div>

            {/* Service Jardin Title & Content */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Service 2 - Jardins</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'serviceJardinImage')}
                onDragOver={(e) => handleDragOver(e, 'serviceJardinImage')}
                onDragLeave={(e) => handleDragLeave(e, 'serviceJardinImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.serviceJardinImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.serviceJardinImage ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.serviceJardinImage} 
                      alt="Jardin" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.serviceJardinImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceJardinImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceJardinImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.serviceJardinImage > 0 && uploadProgress.serviceJardinImage < 100 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.serviceJardinImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="serviceJardinTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="serviceJardinTitle"
                value={settings.serviceJardinTitle}
                onChange={(e) => setSettings({ ...settings, serviceJardinTitle: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Jardins & Aménagements"
              />
              <label htmlFor="serviceJardinContent" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu "Nos prestations"
              </label>
              <RichTextEditor
                value={settings.serviceJardinContent}
                onChange={(value) => setSettings({ ...settings, serviceJardinContent: value })}
                placeholder="Détails des prestations pour les jardins..."
              />
            </div>

            {/* Service Elagage Title & Content */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Service 3 - Élagage</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'serviceElagageImage')}
                onDragOver={(e) => handleDragOver(e, 'serviceElagageImage')}
                onDragLeave={(e) => handleDragLeave(e, 'serviceElagageImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.serviceElagageImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.serviceElagageImage ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.serviceElagageImage} 
                      alt="Élagage" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.serviceElagageImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceElagageImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceElagageImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.serviceElagageImage > 0 && uploadProgress.serviceElagageImage < 100 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.serviceElagageImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="serviceElagageTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="serviceElagageTitle"
                value={settings.serviceElagageTitle}
                onChange={(e) => setSettings({ ...settings, serviceElagageTitle: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Élagage & Entretien"
              />
              <label htmlFor="serviceElagageContent" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu "Nos prestations"
              </label>
              <RichTextEditor
                value={settings.serviceElagageContent}
                onChange={(value) => setSettings({ ...settings, serviceElagageContent: value })}
                placeholder="Détails des prestations pour l'élagage..."
              />
            </div>

            {/* Service Entretien Title & Content */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Service 4 - Entretien</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'serviceEntretienImage')}
                onDragOver={(e) => handleDragOver(e, 'serviceEntretienImage')}
                onDragLeave={(e) => handleDragLeave(e, 'serviceEntretienImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.serviceEntretienImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.serviceEntretienImage ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.serviceEntretienImage} 
                      alt="Entretien" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.serviceEntretienImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceEntretienImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'serviceEntretienImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.serviceEntretienImage > 0 && uploadProgress.serviceEntretienImage < 100 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.serviceEntretienImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="serviceEntretienTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                id="serviceEntretienTitle"
                value={settings.serviceEntretienTitle}
                onChange={(e) => setSettings({ ...settings, serviceEntretienTitle: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Entretien"
              />
              <label htmlFor="serviceEntretienContent" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu "Nos prestations"
              </label>
              <RichTextEditor
                value={settings.serviceEntretienContent}
                onChange={(value) => setSettings({ ...settings, serviceEntretienContent: value })}
                placeholder="Détails des prestations pour l'entretien..."
              />
            </div>
          </div>
          </div>

          {/* Page Réalisations Section */}
          <div id="realisations" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Page Réalisations</h2>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div>
                <label htmlFor="realisationsSlogan" className="block text-sm font-medium text-gray-700 mb-2">
                  Slogan / Sous-titre
                </label>
                <input
                  type="text"
                  id="realisationsSlogan"
                  value={settings.realisationsSlogan}
                  onChange={(e) => setSettings({ ...settings, realisationsSlogan: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Découvrez notre portfolio de projets d'aménagements extérieurs"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Ce texte apparaît sous le titre "Nos Réalisations"
                </p>
              </div>
            </div>
          </div>

          {/* Page À propos Section */}
          <div id="apropos" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b">Page À propos</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page À propos</h3>
            
            {/* Notre Histoire */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Section "Notre Histoire"</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image / Logo
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'aboutHistoryImage')}
                onDragOver={(e) => handleDragOver(e, 'aboutHistoryImage')}
                onDragLeave={(e) => handleDragLeave(e, 'aboutHistoryImage')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.aboutHistoryImage
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.aboutHistoryImage ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.aboutHistoryImage} 
                      alt="Notre Histoire" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.aboutHistoryImage}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutHistoryImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutHistoryImage')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.aboutHistoryImage > 0 && uploadProgress.aboutHistoryImage < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.aboutHistoryImage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <label htmlFor="aboutHistoryTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                id="aboutHistoryTitle"
                type="text"
                value={settings.aboutHistoryTitle}
                onChange={(e) => setSettings({ ...settings, aboutHistoryTitle: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Notre Histoire"
              />
              
              <label htmlFor="aboutHistoryContent" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu
              </label>
              <RichTextEditor
                value={settings.aboutHistoryContent}
                onChange={(value) => setSettings({ ...settings, aboutHistoryContent: value })}
                placeholder="Racontez votre histoire..."
              />
            </div>

            {/* Nos Valeurs - Tuile 1 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Valeur 1</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'aboutValue1Image')}
                onDragOver={(e) => handleDragOver(e, 'aboutValue1Image')}
                onDragLeave={(e) => handleDragLeave(e, 'aboutValue1Image')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.aboutValue1Image
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.aboutValue1Image ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.aboutValue1Image} 
                      alt="Valeur 1" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.aboutValue1Image}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue1Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue1Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.aboutValue1Image > 0 && uploadProgress.aboutValue1Image < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.aboutValue1Image}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <label htmlFor="aboutValue1Title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                id="aboutValue1Title"
                type="text"
                value={settings.aboutValue1Title}
                onChange={(e) => setSettings({ ...settings, aboutValue1Title: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Créativité & Sur-mesure"
              />
              
              <label htmlFor="aboutValue1Desc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="aboutValue1Desc"
                value={settings.aboutValue1Desc}
                onChange={(e) => setSettings({ ...settings, aboutValue1Desc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="Description de cette valeur..."
              />
            </div>

            {/* Nos Valeurs - Tuile 2 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Valeur 2</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'aboutValue2Image')}
                onDragOver={(e) => handleDragOver(e, 'aboutValue2Image')}
                onDragLeave={(e) => handleDragLeave(e, 'aboutValue2Image')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.aboutValue2Image
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.aboutValue2Image ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.aboutValue2Image} 
                      alt="Valeur 2" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.aboutValue2Image}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue2Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue2Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.aboutValue2Image > 0 && uploadProgress.aboutValue2Image < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.aboutValue2Image}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <label htmlFor="aboutValue2Title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                id="aboutValue2Title"
                type="text"
                value={settings.aboutValue2Title}
                onChange={(e) => setSettings({ ...settings, aboutValue2Title: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Respect de l'environnement"
              />
              
              <label htmlFor="aboutValue2Desc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="aboutValue2Desc"
                value={settings.aboutValue2Desc}
                onChange={(e) => setSettings({ ...settings, aboutValue2Desc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="Description de cette valeur..."
              />
            </div>

            {/* Nos Valeurs - Tuile 3 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Valeur 3</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'aboutValue3Image')}
                onDragOver={(e) => handleDragOver(e, 'aboutValue3Image')}
                onDragLeave={(e) => handleDragLeave(e, 'aboutValue3Image')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.aboutValue3Image
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.aboutValue3Image ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.aboutValue3Image} 
                      alt="Valeur 3" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.aboutValue3Image}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue3Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue3Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.aboutValue3Image > 0 && uploadProgress.aboutValue3Image < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.aboutValue3Image}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <label htmlFor="aboutValue3Title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                id="aboutValue3Title"
                type="text"
                value={settings.aboutValue3Title}
                onChange={(e) => setSettings({ ...settings, aboutValue3Title: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Qualité & Professionnalisme"
              />
              
              <label htmlFor="aboutValue3Desc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="aboutValue3Desc"
                value={settings.aboutValue3Desc}
                onChange={(e) => setSettings({ ...settings, aboutValue3Desc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="Description de cette valeur..."
              />
            </div>

            {/* Nos Valeurs - Tuile 4 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Valeur 4</h4>
              
              {/* Image */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div
                onDrop={(e) => handleDrop(e, 'aboutValue4Image')}
                onDragOver={(e) => handleDragOver(e, 'aboutValue4Image')}
                onDragLeave={(e) => handleDragLeave(e, 'aboutValue4Image')}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                  isDragging.aboutValue4Image
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {settings.aboutValue4Image ? (
                  <div className="space-y-3">
                    <img 
                      src={settings.aboutValue4Image} 
                      alt="Valeur 4" 
                      className="max-h-32 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-600">{settings.aboutValue4Image}</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Changer
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue4Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-gray-600 mb-2">Glissez une image ici</p>
                    <label className="inline-block cursor-pointer bg-primary-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Sélectionner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, 'aboutValue4Image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {uploadProgress.aboutValue4Image > 0 && uploadProgress.aboutValue4Image < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.aboutValue4Image}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <label htmlFor="aboutValue4Title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                id="aboutValue4Title"
                type="text"
                value={settings.aboutValue4Title}
                onChange={(e) => setSettings({ ...settings, aboutValue4Title: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Accompagnement personnalisé"
              />
              
              <label htmlFor="aboutValue4Desc" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="aboutValue4Desc"
                value={settings.aboutValue4Desc}
                onChange={(e) => setSettings({ ...settings, aboutValue4Desc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="Description de cette valeur..."
              />
            </div>

            {/* Notre Expertise */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Section "Notre Expertise"</h4>
              
              <label htmlFor="aboutExpertiseTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                id="aboutExpertiseTitle"
                type="text"
                value={settings.aboutExpertiseTitle}
                onChange={(e) => setSettings({ ...settings, aboutExpertiseTitle: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Notre Expertise"
              />
              
              <label htmlFor="aboutExpertiseContent" className="block text-sm font-medium text-gray-700 mb-2">
                Contenu (liste des expertises)
              </label>
              <RichTextEditor
                value={settings.aboutExpertiseContent}
                onChange={(value) => setSettings({ ...settings, aboutExpertiseContent: value })}
                placeholder="Liste des expertises..."
              />
            </div>
          </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
            </button>
            <Link
              href="/admin"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </Link>
          </div>
        </form>

          {/* Bouton de sauvegarde flottant */}
          <button
            type="button"
            onClick={(e) => {
              const form = document.querySelector('form') as HTMLFormElement
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
              }
            }}
            disabled={isSaving}
            className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-2xl hover:bg-primary-700 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-50 group"
            title="Enregistrer les paramètres"
          >
            {isSaving ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </span>
          </button>
          </div>
        </div>
      </main>
    </div>
  )
}

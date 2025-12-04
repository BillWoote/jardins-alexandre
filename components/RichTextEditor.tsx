'use client'

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => (
    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[100px]">
      Chargement de l'éditeur...
    </div>
  )
})

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// Définir modules et formats en dehors du composant pour éviter les re-renders
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline',
  'color', 'background',
  'list',
  'indent',
  'link'
]

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[100px]">
        Chargement de l'éditeur...
      </div>
    )
  }

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white"
      />
    </div>
  )
}

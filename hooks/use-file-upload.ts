"use client"

import { useCallback, useState } from "react"

export interface FileWithPreview {
  id: string
  file: File
  preview?: string
}

export interface UseFileUploadOptions {
  accept?: string
  maxSize?: number
  multiple?: boolean
  onUpload?: (files: FileWithPreview[]) => void
}

export interface UseFileUploadReturn {
  files: FileWithPreview[]
  isDragging: boolean
  errors: string[]
  handleDragEnter: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  openFileDialog: () => void
  removeFile: (id: string) => void
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>
  clearFiles: () => void
}

export function useFileUpload(options: UseFileUploadOptions = {}): [
  {
    files: FileWithPreview[]
    isDragging: boolean
    errors: string[]
  },
  {
    handleDragEnter: (e: React.DragEvent) => void
    handleDragLeave: (e: React.DragEvent) => void
    handleDragOver: (e: React.DragEvent) => void
    handleDrop: (e: React.DragEvent) => void
    openFileDialog: () => void
    removeFile: (id: string) => void
    getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>
    clearFiles: () => void
  }
] {
  const {
    accept = "*/*",
    maxSize = 10 * 1024 * 1024, // 10MB default
    multiple = false,
    onUpload,
  } = options

  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `文件大小超过 ${Math.round(maxSize / 1024 / 1024)}MB 限制`
      }

      if (accept !== "*/*") {
        const acceptTypes = accept.split(",").map((type) => type.trim())
        const fileType = file.type
        const fileName = file.name.toLowerCase()

        const isValidType = acceptTypes.some((acceptType) => {
          if (acceptType.startsWith(".")) {
            return fileName.endsWith(acceptType.toLowerCase())
          }
          if (acceptType.includes("*")) {
            const baseType = acceptType.split("/")[0]
            return fileType.startsWith(baseType)
          }
          return fileType === acceptType
        })

        if (!isValidType) {
          return `不支持的文件类型。支持的格式: ${accept}`
        }
      }

      return null
    },
    [accept, maxSize]
  )

  const createFileWithPreview = useCallback((file: File): FileWithPreview => {
    const id = Math.random().toString(36).substring(2, 15)
    const fileWithPreview: FileWithPreview = {
      id,
      file,
    }

    // Create preview for images
    if (file.type.startsWith("image/")) {
      fileWithPreview.preview = URL.createObjectURL(file)
    }

    return fileWithPreview
  }, [])

  const addFiles = useCallback(
    (newFiles: File[]) => {
      setErrors([])
      const validFiles: FileWithPreview[] = []
      const fileErrors: string[] = []

      newFiles.forEach((file) => {
        const error = validateFile(file)
        if (error) {
          fileErrors.push(error)
        } else {
          validFiles.push(createFileWithPreview(file))
        }
      })

      if (fileErrors.length > 0) {
        setErrors(fileErrors)
        return
      }

      setFiles((prev) => {
        let updatedFiles: FileWithPreview[]
        if (multiple) {
          updatedFiles = [...prev, ...validFiles]
        } else {
          // Cleanup previous preview URLs
          prev.forEach((f) => {
            if (f.preview) {
              URL.revokeObjectURL(f.preview)
            }
          })
          updatedFiles = validFiles
        }

        onUpload?.(updatedFiles)
        return updatedFiles
      })
    },
    [validateFile, createFileWithPreview, multiple, onUpload]
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      addFiles(droppedFiles)
    },
    [addFiles]
  )

  const openFileDialog = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.multiple = multiple
    input.style.display = "none"

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        const selectedFiles = Array.from(target.files)
        addFiles(selectedFiles)
      }
      document.body.removeChild(input)
    }

    document.body.appendChild(input)
    input.click()
  }, [accept, multiple, addFiles])

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
    setErrors([])
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
    setErrors([])
  }, [files])

  const getInputProps = useCallback(
    (): React.InputHTMLAttributes<HTMLInputElement> => ({
      type: "file",
      accept,
      multiple,
      onChange: (e) => {
        if (e.target.files) {
          const selectedFiles = Array.from(e.target.files)
          addFiles(selectedFiles)
        }
      },
    }),
    [accept, multiple, addFiles]
  )

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      clearFiles,
    },
  ]
}

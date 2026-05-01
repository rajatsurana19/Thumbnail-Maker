import { useState } from 'react'
import '../styles/UploadForm.css'

function UploadForm({ onUploadSuccess, isLoading }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file')
      setFile(null)
      setPreview(null)
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      setFile(null)
      setPreview(null)
      return
    }

    setFile(selectedFile)
    setError('')


    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image first')
      return
    }
    onUploadSuccess(file)
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-container">
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-box">
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <div className="upload-placeholder">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="upload-text">Click to upload or drag and drop</p>
                <p className="upload-subtext">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="file-input"
          />
        </label>

        {error && <div className="error-message">{error}</div>}

        {preview && (
          <div className="button-group">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Uploading...' : 'Upload Headshot'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="btn btn-secondary"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default UploadForm

import { useState, useRef } from 'react'
import UploadForm from './components/UploadForm'
import { uploadHeadshot, createjob, subscribeToJob } from './api'
import './App.css'

function App() {
  const [headshotUrl, setHeadshotUrl] = useState(null)
  const [numThumbnails, setNumThumbnails] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [jobId, setJobId] = useState(null)
  const [status, setStatus] = useState('')
  const [thumbnails, setThumbnails] = useState([])
  const [error, setError] = useState('')
  const eventSourceRef = useRef(null)

  const handleUploadSuccess = async (file) => {
    try {
      setIsLoading(true)
      setError('')
      const response = await uploadHeadshot(file)
      setHeadshotUrl(response.headshot_url)
      setStatus('Headshot uploaded successfully!')
    } catch (err) {
      setError(err.message)
      setStatus('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateThumbnails = async () => {
    if (!headshotUrl) {
      setError('Please upload a headshot first')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      setThumbnails([])
      setStatus('Creating job...')

      
      const jobResponse = await createjob({
        prompt: 'Generate professional thumbnails',
        numThumbnails: numThumbnails,
        headshotUrl: headshotUrl
      })

      setJobId(jobResponse.job_id)
      setStatus('Job created. Generating thumbnails...')

      
      subscribeToJob(jobResponse.job_id, {
        onThumbnailReady: (data) => {
          setThumbnails(prev => [...prev, data])
          setStatus(`Generated ${data.thumbnail_number}/${numThumbnails}`)
        },
        onThumbnailFailed: (data) => {
          setError(`Failed to generate thumbnail: ${data.error}`)
        },
        onJobComplete: (data) => {
          setStatus('All thumbnails generated successfully!')
          setJobId(null)
        },
        onError: (error) => {
          setError('Event stream error: ' + error.message)
          setJobId(null)
        }
      })
    } catch (err) {
      setError(err.message)
      setStatus('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setHeadshotUrl(null)
    setNumThumbnails(1)
    setJobId(null)
    setStatus('')
    setThumbnails([])
    setError('')
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Thumbnail Maker</h1>
        <p>Generate professional thumbnails from your headshot</p>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          {/* Upload Section */}
          {!headshotUrl && (
            <section className="upload-section">
              <h2>Step 1: Upload Your Headshot</h2>
              <UploadForm onUploadSuccess={handleUploadSuccess} isLoading={isLoading} />
            </section>
          )}

          {headshotUrl && !jobId && (
            <section className="config-section">
              <div className="config-card">
                <div className="headshot-preview">
                  <img src={headshotUrl} alt="Uploaded headshot" />
                </div>

                <div className="config-options">
                  <h2>Step 2: Configure Thumbnails</h2>
                  
                  <div className="form-group">
                    <label htmlFor="num-thumbnails">Number of Thumbnails:</label>
                    <div className="thumbnail-selector">
                      {[1, 2, 3].map(num => (
                        <button
                          key={num}
                          type="button"
                          className={`thumbnail-option ${numThumbnails === num ? 'active' : ''}`}
                          onClick={() => setNumThumbnails(num)}
                          disabled={isLoading}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      onClick={handleGenerateThumbnails}
                      disabled={isLoading}
                      className="btn btn-primary btn-large"
                    >
                      {isLoading ? 'Generating...' : 'Generate Thumbnails'}
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={isLoading}
                      className="btn btn-secondary"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          
          {thumbnails.length > 0 && (
            <section className="results-section">
              <h2>Generated Thumbnails</h2>
              <div className="thumbnails-grid">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="thumbnail-card">
                    <img src={thumbnail.url} alt={`Thumbnail ${index + 1}`} />
                    <p className="thumbnail-label">Thumbnail {thumbnail.thumbnail_number}</p>
                  </div>
                ))}
              </div>
              <div className="button-group">
                <button
                  onClick={handleReset}
                  className="btn btn-primary"
                >
                  Generate More
                </button>
              </div>
            </section>
          )}
        </div>

        {status && (
          <div className="status-message">
            <div className="spinner"></div>
            {status}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </main>
    </div>
  )
}

export default App

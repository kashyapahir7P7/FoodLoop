import { useState } from "react";
import "../../styles/create-food.css";
import axios from "axios";

const CreateFood = () => {

  const [previewVideo, setPreviewVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVideoChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        video: file
      });

      setPreviewVideo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const SubmitData = new FormData()

    if (!formData.video || !formData.name) return;

    setIsUploading(true);

    SubmitData.append('name', formData.name),
      SubmitData.append('description', formData.description),
      SubmitData.append('video', formData.video)

    try {
      await axios.post("/api/food", SubmitData, {
        withCredentials: true
      });

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setPreviewVideo(null);
        setFormData({
          name: "",
          description: "",
          video: null
        });
      }, 2500);

    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }

  };

  return (
    <div className="create-food-page">

      {showToast && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 1000,
          animation: 'slideDown 0.3s ease-out'
        }}>
          <span style={{ fontSize: '20px' }}>✓</span>
          <span style={{ fontWeight: '600' }}>Reel Published Successfully!</span>
          <style>{`
                  @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }
              `}</style>
        </div>
      )}

      <div className="create-food-container">

        {/* Header */}
        <div className="create-food-header">

          <h1>Create Food Reel</h1>

          <p>
            Upload your delicious food reel and share it with users 🍴
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Video Upload */}
          <div className="upload-card">

            <h2 className="section-title">
              Food Video
            </h2>

            <label className="video-upload-box">

              {
                previewVideo ? (
                  <video
                    src={previewVideo}
                    autoPlay
                    muted
                    loop
                    controls
                  />
                ) : (
                  <div className="upload-placeholder">

                    <span>🎥</span>

                    <p>
                      Click to upload food video
                    </p>

                  </div>
                )
              }

              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoChange}
                disabled={isUploading}
              />

            </label>

          </div>

          {/* Food Details */}
          <div className="form-card">

            <h2 className="section-title">
              Food Details
            </h2>

            {/* Food Name */}
            <div className="form-group">

              <label>
                Food Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Cheese Burger"
                value={formData.name}
                onChange={handleChange}
                disabled={isUploading}
              />

            </div>

            {/* Description */}
            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your food..."
                value={formData.description}
                onChange={handleChange}
                maxLength={120}
                disabled={isUploading}
              />

              <span className="char-count">
                {formData.description.length}/120
              </span>

            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="publish-btn"
            disabled={isUploading}
            style={{
              opacity: isUploading ? 0.7 : 1,
              cursor: isUploading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isUploading ? (
              <>
                <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                Publishing Reel...
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </>
            ) : (
              "Publish Food Reel"
            )}
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateFood;
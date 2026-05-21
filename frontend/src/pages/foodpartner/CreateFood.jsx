import { useState } from "react";
import "../../styles/create-food.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {

  const [previewVideo, setPreviewVideo] = useState(null);
  const navigate = useNavigate();

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

    SubmitData.append('name', formData.name),
      SubmitData.append('description', formData.description),
      SubmitData.append('video', formData.video)

     await axios.post("https://foodloop-ailt.onrender.com/api/food", SubmitData, {
      withCredentials: true
    })

    navigate("/")
  };

  return (
    <div className="create-food-page">

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
              />

              <span className="char-count">
                {formData.description.length}/120
              </span>

            </div>

          </div>

          {/* Submit Button */}
          <button className="publish-btn">

            Publish Food Reel 

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateFood;
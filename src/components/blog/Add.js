"use client"
import { Helmet } from "react-helmet-async"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Store } from "../../Store"

import { API_TOKEN, API_URL } from "../../Constants.js"
import { extractYouTubeId } from "../helpers/functions";

import Layout from "../Layout"
import RichTextEditor from "../RichTextEditor.js"

function BlogAdd() {
  const [categories, setCategories] = useState()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { adminInfo } = state
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Main blog data
  const [inputs, setInputs] = useState({
    category_id: "",
    name: "",
    slug: "",
    image_name: "",
    image_alt: "",
    bdate: "",
    action_title: "",
    action_btn_1_text: "",
    action_btn_1_link: "",
    action_btn_2_text: "",
    action_btn_2_link: "",
    action_subtitle_1: "",
    action_description_1: "",
    action_subtitle_2: "",
    action_description_2: "",

    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    publish: 1,
    // Banner fields
    banner_background_color: "#ffffff",
    banner_text_color: "#000000",
    banner_title: "",
    banner_image: null,
  })

  // File uploads
  const [selectedFile, setSelectedFile] = useState()
  const [bannerFile, setBannerFile] = useState()
  const [description, setDescription] = useState()

  // Blog sections (repeater)
  const [sections, setSections] = useState([
    {
      title: "",
      media: null,
      media_type: "none",
      description: "",
      grey_quote: "",
      grey_quote_bg_color: "",
      grey_quote_border_color: "",
      section_bg_color: "",
      section_border_color: "",
      order: 0,
      publish: 1,
    },
  ])

  // FAQs (repeater)
  const [faqs, setFaqs] = useState([
    {
      question: "",
      answer: "",
      order: 0,
      publish: 1,
    },
  ])

  // Active tab state
  const [activeTab, setActiveTab] = useState("general")

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: API_TOKEN,
  }

  const getCategories = async () => {
    const res = await axios
      .get(`${API_URL}category/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },
      })
      .catch((err) => console.log(err))
    const data = await res.data
    if (data.categories) {
      setCategories(data.categories)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleBannerFileChange = (event) => {
    setBannerFile(event.target.files[0])
  }

  // Handle section changes
  const handleSectionChange = (index, name, value) => {
    const updatedSections = [...sections];
    updatedSections[index][name] = value;

    // Reset media if media_type is changed to ensure correctness
    if (name === "media_type") {
      updatedSections[index].media = value === "youtube" ? "" : null;
    }

    setSections(updatedSections);
  };

  const handleSectionMediaChange = (index, e) => {
    const file = e.target.files[0];
    const newSections = [...sections];
    newSections[index].media = file;
    setSections(newSections);
  };


  // Add new section
  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        media: null,
        media_type: "none",
        description: "",
        grey_quote: "",
        grey_quote_bg_color: "",
        grey_quote_border_color: "",
        section_bg_color: "",
        section_border_color: "",
        order: sections.length,
        publish: 1,
      },
    ])
  }

  // Remove a section
  const removeSection = (index) => {
    const newSections = [...sections]
    newSections.splice(index, 1)
    // Update order values
    newSections.forEach((section, idx) => {
      section.order = idx
    })
    setSections(newSections)
  }

  // Handle FAQ changes
  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs]
    newFaqs[index][field] = value
    setFaqs(newFaqs)
  }

  // Add new FAQ
  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        question: "",
        answer: "",
        order: faqs.length,
        publish: 1,
      },
    ])
  }

  // Remove a FAQ
  const removeFaq = (index) => {
    const newFaqs = [...faqs]
    newFaqs.splice(index, 1)
    // Update order values
    newFaqs.forEach((faq, idx) => {
      faq.order = idx
    })
    setFaqs(newFaqs)
  }

  // Move section up in order
  const moveSectionUp = (index) => {
    if (index === 0) return
    const newSections = [...sections]
    ;[newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]]
    // Update order values
    newSections.forEach((section, idx) => {
      section.order = idx
    })
    setSections(newSections)
  }

  // Move section down in order
  const moveSectionDown = (index) => {
    if (index === sections.length - 1) return
    const newSections = [...sections]
    ;[newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
    // Update order values
    newSections.forEach((section, idx) => {
      section.order = idx
    })
    setSections(newSections)
  }

  // Move FAQ up in order
  const moveFaqUp = (index) => {
    if (index === 0) return
    const newFaqs = [...faqs]
    ;[newFaqs[index - 1], newFaqs[index]] = [newFaqs[index], newFaqs[index - 1]]
    // Update order values
    newFaqs.forEach((faq, idx) => {
      faq.order = idx
    })
    setFaqs(newFaqs)
  }

  // Move FAQ down in order
  const moveFaqDown = (index) => {
    if (index === faqs.length - 1) return
    const newFaqs = [...faqs]
    ;[newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]]
    // Update order values
    newFaqs.forEach((faq, idx) => {
      faq.order = idx
    })
    setFaqs(newFaqs)
  }

  const addBlog = async () => {
    try {
      setIsSubmitting(true)
      const formData = new FormData()

      // Main blog data
      if (selectedFile) {
        formData.append("image", selectedFile)
      }
      formData.append("category_id", inputs.category_id)
      formData.append("name", inputs.name)
      formData.append("slug", inputs.slug)
      formData.append("image_name", inputs.image_name)
      formData.append("image_alt", inputs.image_alt)
      formData.append("description", description)
      formData.append("bdate", inputs.bdate)
      formData.append("action_title", inputs.action_title);
      formData.append("action_btn_1_text", inputs.action_btn_1_text);
      formData.append("action_btn_1_link", inputs.action_btn_1_link);
      formData.append("action_btn_2_text", inputs.action_btn_2_text);
      formData.append("action_btn_2_link", inputs.action_btn_2_link);
      formData.append("action_subtitle_1", inputs.action_subtitle_1);
      formData.append("action_description_1", inputs.action_description_1);
      formData.append("action_subtitle_2", inputs.action_subtitle_2);
      formData.append("action_description_2", inputs.action_description_2);

      formData.append("meta_title", inputs.meta_title)
      formData.append("meta_keywords", inputs.meta_keywords)
      formData.append("meta_description", inputs.meta_description)
      formData.append("publish", inputs.publish)

      // Banner data
      formData.append("banner_background_color", inputs.banner_background_color)
      formData.append("banner_text_color", inputs.banner_text_color)
      formData.append("banner_title", inputs.banner_title)
      if (bannerFile) {
        formData.append("banner_image", bannerFile)
      }

      // Step 1: Prepare sections data
      const sectionsData = sections.map((section) => ({
        title: section.title,
        media_type: section.media_type,
        media: section.media_type === "youtube" ? section.media : "", // Only send media string for YouTube
        description: section.description,
        grey_quote: section.grey_quote,
        grey_quote_bg_color: section.grey_quote_bg_color,
        grey_quote_border_color: section.grey_quote_border_color,
        section_bg_color: section.section_bg_color,
        section_border_color: section.section_border_color,
        order: section.order,
        publish: section.publish,
      }));

      formData.append("sections", JSON.stringify(sectionsData));

      // Step 2: Append actual media files (image/video only)
      sections.forEach((section, index) => {
        if (
          section.media &&
          section.media instanceof File &&
          (section.media_type === "image" || section.media_type === "video")
        ) {
          formData.append(`section_media_${index}`, section.media);
        }
      });


      // Process FAQs
      formData.append("faqs", JSON.stringify(faqs))

      console.log("Submitting form data...")
      const res = await axios.post(`${API_URL}blog/add`, formData, {
        headers: headers,
      })
      return res.data
    } catch (err) {
      console.error("Error submitting form:", err)
      return { error: true, message: "Error submitting form: " + (err.message || "Unknown error") }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    if (!inputs.name || !inputs.category_id || !selectedFile || !inputs.bdate) {
      toast.error("Please fill all required fields")
      return
    }

    addBlog().then((data) => {
      if (!data.error) {
        toast.success(data.message)
        navigate("/blog")
      } else {
        toast.error(data.message || "Error adding blog")
      }
    })
  }

  return (
    <Layout>
      <Helmet>
        <title>Blog Add</title>
      </Helmet>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light"></span> Blog Add
      </h4>

      <div className="row mb-3">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "general" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("general")}
              >
                General
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "banner" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("banner")}
              >
                Banner
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "sections" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("sections")}
              >
                Sections
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "faqs" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("faqs")}
              >
                FAQs
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "action" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("action")}
              >
                Action
              </a>
            </li>


            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "seo" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("seo")}
              >
                SEO
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-xl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* General Tab Content */}
                {activeTab === "general" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        required
                        onChange={handleInputChange}
                        value={inputs.name}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        onChange={handleInputChange}
                        value={inputs.slug}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-control"
                        name="category_id"
                        value={inputs.category_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select</option>
                        {categories &&
                          categories.map((category, index) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input type="file" className="form-control" required onChange={handleFileChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="image_name"
                        onChange={handleInputChange}
                        value={inputs.image_name}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image Alt</label>
                      <input
                        type="text"
                        className="form-control"
                        name="image_alt"
                        onChange={handleInputChange}
                        value={inputs.image_alt}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <RichTextEditor
                        initialValue={description}
                        getValue={(value) => {
                          setDescription(value)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="bdate"
                        required
                        onChange={handleInputChange}
                        value={inputs.bdate}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Publish</label>
                      <select
                        className="form-control"
                        name="publish"
                        value={inputs.publish}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Banner Tab Content */}
                {activeTab === "banner" && (
                  <>
                    <div className="alert alert-info">
                      Configure the top banner that appears at the beginning of your blog post.
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Banner Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="banner_title"
                            onChange={handleInputChange}
                            value={inputs.banner_title}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Background Color</label>
                          <div className="input-group">
                            <input
                              type="color"
                              className="form-control form-control-color"
                              name="banner_background_color"
                              onChange={handleInputChange}
                              value={inputs.banner_background_color}
                            />
                            <input
                              type="text"
                              className="form-control"
                              name="banner_background_color"
                              onChange={handleInputChange}
                              value={inputs.banner_background_color}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label">Text Color</label>
                          <div className="input-group">
                            <input
                              type="color"
                              className="form-control form-control-color"
                              name="banner_text_color"
                              onChange={handleInputChange}
                              value={inputs.banner_text_color}
                            />
                            <input
                              type="text"
                              className="form-control"
                              name="banner_text_color"
                              onChange={handleInputChange}
                              value={inputs.banner_text_color}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Banner Image</label>
                      <input type="file" className="form-control" onChange={handleBannerFileChange} />
                    </div>
                    <div
                      className="card mt-3"
                      style={{
                        backgroundColor: inputs.banner_background_color,
                        color: inputs.banner_text_color,
                        padding: "20px",
                        borderRadius: "5px",
                      }}
                    >
                      <div className="card-body">
                        <h5>Banner Preview</h5>
                        <p>{inputs.banner_title || "Banner Title Will Appear Here"}</p>
                        {bannerFile && (
                          <div className="text-center">
                            <img
                              src={URL.createObjectURL(bannerFile) || "/placeholder.svg"}
                              alt="Banner preview"
                              style={{ maxHeight: "150px", maxWidth: "100%" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Sections Tab Content */}
                {activeTab === "sections" && (
                  <>
                    <div className="alert alert-info">
                      Add content sections to your blog post. Sections will be displayed in the order shown below.
                    </div>

                    {sections.map((section, index) => (
                      <div key={index} className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Section {index + 1}</h5>
                          <div>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary me-1"
                              onClick={() => moveSectionUp(index)}
                              disabled={index === 0}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary me-1"
                              onClick={() => moveSectionDown(index)}
                              disabled={index === sections.length - 1}
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeSection(index)}
                              disabled={sections.length === 1}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={section.title}
                              onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                            />
                          </div>

                          <div className="mb-3">
                              <label className="form-label">Media Type</label>
                              <select
                                className="form-control"
                                value={section.media_type}
                                onChange={(e) => handleSectionChange(index, "media_type", e.target.value)}
                              >
                                <option value="none">None</option>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                                <option value="youtube">YouTube</option>
                              </select>
                            </div>

                            {section.media_type === "image" && (
                              <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input
                                  type="file"
                                  name="media"
                                  className="form-control"
                                  accept="image/*"
                                  onChange={(e) => handleSectionMediaChange(index, e)}
                                />

                                {/* Preview existing uploaded image */}
                                {section.media && typeof section.media === "string" && (
                                  <img
                                    src={BACKEND_URL + section.media}
                                    alt="Preview"
                                    className="mt-2"
                                    style={{ maxHeight: "100px" }}
                                  />
                                )}

                                {/* Preview newly selected image */}
                                {section.media && section.media instanceof File && (
                                  <img
                                    src={URL.createObjectURL(section.media)}
                                    alt="Preview"
                                    className="mt-2"
                                    style={{ maxHeight: "100px" }}
                                  />
                                )}
                              </div>
                            )}

                            {section.media_type === "video" && (
                              <div className="mb-3">
                                <label className="form-label">Video</label>
                                <input
                                  type="file"
                                  name="media"
                                  className="form-control"
                                  accept="video/*"
                                  onChange={(e) => handleSectionMediaChange(index, e)}
                                />

                                {/* Optional: preview existing video */}
                                {section.media && typeof section.media === "string" && (
                                  <video
                                    className="mt-2"
                                    style={{ maxHeight: "200px", width: "300" }}
                                    controls
                                  >
                                    <source src={BACKEND_URL + section.media} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                              </div>
                            )}

                            {section.media_type === "youtube" && (
                              <div className="mb-3">
                                <label className="form-label">YouTube Share URL</label>
                                <input
                                  type="text"
                                  name="media"
                                  className="form-control"
                                  placeholder="e.g. https://youtu.be/xyz123"
                                  value={section.media || ""}
                                  onChange={(e) => handleSectionChange(index, e.target.name, e.target.value)}
                                />

                                {section.media && extractYouTubeId(section.media) && (
                                  <div className="mt-2">
                                    <iframe
                                      width="300"
                                      height="200"
                                      src={`https://www.youtube.com/embed/${extractYouTubeId(section.media)}`}
                                      title="YouTube video preview"
                                      frameBorder="0"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                )}
                              </div>
                            )}


                          <div className="mb-3">
                            <label className="form-label">Content</label>
                            <RichTextEditor
                              initialValue={section.description}
                              getValue={(value) => handleSectionChange(index, "description", value)}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Grey Quote (Optional)</label>
                            <RichTextEditor
                              initialValue={section.grey_quote}
                              getValue={(value) => handleSectionChange(index, "grey_quote", value)}
                            />
                          </div>

                          <div className="row">
                              <div className="col-md-6 mb-3">
                                <label className="form-label">Grey Quote Background Color</label>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="color"
                                    className="form-control form-control-color me-2"
                                    value={section.grey_quote_bg_color}
                                    onChange={(e) => handleSectionChange(index, "grey_quote_bg_color", e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={section.grey_quote_bg_color}
                                    onChange={(e) => handleSectionChange(index, "grey_quote_bg_color", e.target.value)}
                                    placeholder="#ffffff"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="form-label">Grey Quote Border Color</label>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="color"
                                    className="form-control form-control-color me-2"
                                    value={section.grey_quote_border_color}
                                    onChange={(e) => handleSectionChange(index, "grey_quote_border_color", e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={section.grey_quote_border_color}
                                    onChange={(e) => handleSectionChange(index, "grey_quote_border_color", e.target.value)}
                                    placeholder="#cccccc"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <label className="form-label">Section Background Color</label>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="color"
                                    className="form-control form-control-color me-2"
                                    value={section.section_bg_color}
                                    onChange={(e) => handleSectionChange(index, "section_bg_color", e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={section.section_bg_color}
                                    onChange={(e) => handleSectionChange(index, "section_bg_color", e.target.value)}
                                    placeholder="#f9f9f9"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="form-label">Section Border Color</label>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="color"
                                    className="form-control form-control-color me-2"
                                    value={section.section_border_color}
                                    onChange={(e) => handleSectionChange(index, "section_border_color", e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={section.section_border_color}
                                    onChange={(e) => handleSectionChange(index, "section_border_color", e.target.value)}
                                    placeholder="#dddddd"
                                  />
                                </div>
                              </div>
                            </div>


                          <div className="mb-3">
                            <label className="form-label">Publish</label>
                            <select
                              className="form-control"
                              value={section.publish}
                              onChange={(e) => handleSectionChange(index, "publish", e.target.value)}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-center">
                      <button type="button" className="btn btn-primary" onClick={addSection}>
                        Add Section
                      </button>
                    </div>
                  </>
                )}

                {/* FAQs Tab Content */}
                {activeTab === "faqs" && (
                  <>
                    <div className="alert alert-info">Add frequently asked questions related to this blog post.</div>

                    {faqs.map((faq, index) => (
                      <div key={index} className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">FAQ {index + 1}</h5>
                          <div>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary me-1"
                              onClick={() => moveFaqUp(index)}
                              disabled={index === 0}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary me-1"
                              onClick={() => moveFaqDown(index)}
                              disabled={index === faqs.length - 1}
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeFaq(index)}
                              disabled={faqs.length === 1}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label className="form-label">Question</label>
                            <input
                              type="text"
                              className="form-control"
                              value={faq.question}
                              onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Answer</label>
                            <RichTextEditor
                              initialValue={faq.answer}
                              getValue={(value) => handleFaqChange(index, "answer", value)}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Publish</label>
                            <select
                              className="form-control"
                              value={faq.publish}
                              onChange={(e) => handleFaqChange(index, "publish", e.target.value)}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-center">
                      <button type="button" className="btn btn-primary" onClick={addFaq}>
                        Add FAQ
                      </button>
                    </div>
                  </>
                )}


                {/* Action Tab Content */}
                {activeTab === "action" && (
                  <>
                    <div className="alert alert-info">Configure call-to-action content and buttons.</div>

                    <div className="mb-3">
                      <label className="form-label">Action Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="action_title"
                        onChange={handleInputChange}
                        value={inputs.action_title}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Button 1 Text</label>
                        <input
                          type="text"
                          className="form-control"
                          name="action_btn_1_text"
                          onChange={handleInputChange}
                          value={inputs.action_btn_1_text}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Button 1 Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="action_btn_1_link"
                          onChange={handleInputChange}
                          value={inputs.action_btn_1_link}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Button 2 Text</label>
                        <input
                          type="text"
                          className="form-control"
                          name="action_btn_2_text"
                          onChange={handleInputChange}
                          value={inputs.action_btn_2_text}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Button 2 Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="action_btn_2_link"
                          onChange={handleInputChange}
                          value={inputs.action_btn_2_link}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Action Subtitle 1</label>
                      <input
                        type="text"
                        className="form-control"
                        name="action_subtitle_1"
                        onChange={handleInputChange}
                        value={inputs.action_subtitle_1}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Action Description 1</label>
                      <RichTextEditor
                        initialValue={inputs.action_description_1}
                        getValue={(value) => {
                          setInputs((prev) => ({ ...prev, action_description_1: value }));
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Action Subtitle 2</label>
                      <input
                        type="text"
                        className="form-control"
                        name="action_subtitle_2"
                        onChange={handleInputChange}
                        value={inputs.action_subtitle_2}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Action Description 2</label>
                      <RichTextEditor
                        initialValue={inputs.action_description_2}
                        getValue={(value) => {
                          setInputs((prev) => ({ ...prev, action_description_2: value }));
                        }}
                      />
                    </div>
                  </>
                )}


                {/* SEO Tab Content */}
                {activeTab === "seo" && (
                  <>
                    <div className="alert alert-info">Configure search engine optimization settings.</div>
                    <div className="mb-3">
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="meta_title"
                        onChange={handleInputChange}
                        value={inputs.meta_title}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Meta Keywords</label>
                      <input
                        type="text"
                        className="form-control"
                        name="meta_keywords"
                        onChange={handleInputChange}
                        value={inputs.meta_keywords}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        className="form-control"
                        name="meta_description"
                        onChange={handleInputChange}
                        value={inputs.meta_description}
                        rows="4"
                      ></textarea>
                    </div>
                  </>
                )}

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogAdd

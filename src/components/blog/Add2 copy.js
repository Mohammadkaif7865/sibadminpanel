import { Helmet } from "react-helmet-async";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../Layout";

function Add2() {
    const editorRef = useRef(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (window.CKEDITOR) {
            const editorInstance = window.CKEDITOR.replace(editorRef.current);

            return () => {
                if (editorInstance) {
                    editorInstance.destroy(); 
                }
            };
        } else {
            console.error("CKEditor script not loaded");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const editorInstance = window.CKEDITOR.instances[editorRef.current.id];
        if (editorInstance) {
            const descriptionData = editorInstance.getData();
            setDescription(descriptionData);
            console.log("Editor Data:", descriptionData);

            // Call the addBlog function (ensure it is defined)
            addBlog().then((data) => {
                console.log(data);
                // Uncomment the following lines to handle success/error
                // if (!data.error) {
                //     toast.success(data.message);
                //     navigate("/blog");
                // } else {
                //     toast.error(data.message);
                // }
            });
        } else {
            console.error("CKEditor instance not found.");
        }
    };

    // Define your addBlog function here
    const addBlog = async () => {
        // Simulated API call for demonstration
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: "Blog added successfully!" });
            }, 1000);
        });
    };

    return (
        <Layout>
            <Helmet>
                <title>Blog Add</title>
                <script src="https://cdn.ckeditor.com/4.20.2/standard/ckeditor.js"></script>
            </Helmet>
            <h4 className="fw-bold py-3 mb-4">Blog Add</h4>
            <form onSubmit={handleSubmit}>




                
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        ref={editorRef}
                        className="form-control"
                        id="editor"
                        style={{ height: "300px" }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </Layout>
    );
}

export default Add2;

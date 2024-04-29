"use client"
import { useEffect, useRef, useState } from "react";

export default function ViewerComponent({id, document, onClose, name, editor}) {


  const getFiles = async() => {
    try {
      const response = await fetch('/api/move_ins/forms/fetch', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          document: document
        })
      });

      const blob = await response.blob();
      const fileData = await blob.arrayBuffer()
      return fileData
    } catch (error) {
    }
  }
  

  const containerRef = useRef(null);

  const [instance, setInstance] = useState(null)

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;
    (async function () {
      PSPDFKit = await import("pspdfkit");
      const fileData = await getFiles()

      PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

      const pdf = await PSPDFKit.load({
        licenseKey: 'ZuQLd-wX8fSejt7WfDwFohgX36zXvoqK1VYsZoCnJn1DQYKxbBIqsdf6j2ez7GCDf172GOb6i-Xg6Al39A-xBQBw9S1ns36gKHZRrIajlB3mPonpx4UY9AiWBfAKyALrgG4WjSXJzWFZsHyAauxsrgC9lQ7bdUw-9WyM1_KVM2QKdx3OaBKJIP_XUdyeR7tHPIjpGRJDura1Fw',
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: fileData,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.origin}/`
      });
      setInstance(pdf)
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  const handleSubmit = async(complete) => {
    try {
      console.log("hello")
      // Export the PDF document as an ArrayBuffer
      const arrayBuffer = await instance.exportPDF();

      // Create a Blob from the ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

      // Create FormData and append the Blob
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('id', id)
      formData.append('path', document)
      formData.append('complete', complete)
      formData.append('editor', editor)
      formData.append('formName', name)

      // Upload the file to the server
      await fetch('/api/move_ins/forms/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('PDF document uploaded successfully');
    } catch (error) {
      console.error('Error exporting and uploading PDF document:', error);
    }
  }

  return <div className="flex flex-col justify-center">
    <div className="flex flex-row items-center justify-between">
  <div className="flex flex-row items-center">
    <button onClick={onClose} className="p-2 m-5 flex flex-row">
      <img src="/assets/icons/undo.svg" className="w-6 h-6 pr-2"/>
      Back
    </button>
    <div className="label">Editing {name}</div>
  </div>
  <div>
    <button className="p-2 px-4 mr-10" onClick={() => { handleSubmit(false) }}> Save </button>
    <button className="p-2 mr-4" onClick={() => { handleSubmit(true) }}> Mark as Complete </button>
  </div>
</div>
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />

  </div>;
}
"use client"
import { useEffect, useRef } from "react";

export default function ViewerComponent({document, onClose}) {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log(document)
    const container = containerRef.current;
    let PSPDFKit;
    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

      await PSPDFKit.load({
        licenseKey: 'ZuQLd-wX8fSejt7WfDwFohgX36zXvoqK1VYsZoCnJn1DQYKxbBIqsdf6j2ez7GCDf172GOb6i-Xg6Al39A-xBQBw9S1ns36gKHZRrIajlB3mPonpx4UY9AiWBfAKyALrgG4WjSXJzWFZsHyAauxsrgC9lQ7bdUw-9WyM1_KVM2QKdx3OaBKJIP_XUdyeR7tHPIjpGRJDura1Fw',
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: `/move-in/${document}`,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.origin}/`
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div>
    <button onClick={onClose} className="p-2 m-5 flex flex-row"><img src="/assets/icons/undo.svg" className="w-6 h-6 pr-2"/> Back</button>
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />

  </div>;
}
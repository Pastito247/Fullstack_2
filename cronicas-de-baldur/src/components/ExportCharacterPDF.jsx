import React, { useRef } from "react";
import { usePDF } from "react-to-pdf";

export default function ExportCharacterPDF({ children, filename = "character-sheet.pdf" }) {
  const ref = useRef();

  const [instance, toPdf] = usePDF({
    targetRef: ref,
    filename,
    options: {
    },
  });

  return (
    <div>
      <button className="btn btn-outline-warning mb-3" onClick={toPdf}>
        📄 Descargar hoja (PDF)
      </button>

      <div ref={ref}>
        {children}
      </div>
    </div>
  );
}

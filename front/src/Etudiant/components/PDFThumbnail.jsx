import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function PDFThumbnail({ pdfUrl,type }) {
  // Configuration pour la bibliothèque pdf.js
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <div>
        {type==='fenetre' ?
           <Document file={pdfUrl}>
           <Page
             pageNumber={1}
             height={300}
             width={330}
             renderTextLayer={false} // Désactiver le rendu du texte
             renderInteractiveForms={false} // Désactiver le rendu des formulaires interactifs
             renderAnnotationLayer={false} // Désactiver le rendu des annotations
             onLoadSuccess={(pdf) => {
               // Fonction de rappel appelée une fois que le document PDF est chargé avec succès
               console.log('Document loaded:', pdf.numPages);
             }}
           />
         </Document>
         :
         <Document file={pdfUrl}>
         <Page
           pageNumber={1}
           height={220}
           width={235}
           renderTextLayer={false} // Désactiver le rendu du texte
           renderInteractiveForms={false} // Désactiver le rendu des formulaires interactifs
           renderAnnotationLayer={false} // Désactiver le rendu des annotations
           onLoadSuccess={(pdf) => {
             // Fonction de rappel appelée une fois que le document PDF est chargé avec succès
             console.log('Document loaded:', pdf.numPages);
           }}
         />
       </Document>
        }
     
    </div>
  );
}

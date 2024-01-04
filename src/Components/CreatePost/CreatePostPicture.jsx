import React, { useState } from 'react'
import { fabric } from 'fabric';

const CreatePostPicture = () => {
    const [canvas, setCanvas] = useState(null);
  
    const initializeCanvas = () => {
      const newCanvas = new fabric.Canvas('editor-canvas', {
        width: 500,
        height: 500,
      });
  
      setCanvas(newCanvas);
  
      // Agregar una plantilla inicial (fondo de color)
      const rect = new fabric.Rect({
        width: newCanvas.width,
        height: newCanvas.height,
        fill: 'lightblue',
      });
  
      newCanvas.add(rect);
    };
  
    const addText = () => {
      const text = new fabric.Textbox('Escribe aquí', {
        left: 50,
        top: 50,
        fill: '#000',
      });
      canvas.add(text);
    };
  
    const saveImage = () => {
      const dataUrl = canvas.toDataURL({ format: 'png' });
      // Aquí podrías enviar dataUrl al servidor para guardar la imagen.
      // También podrías mostrar un previo antes de la publicación.
      console.log(dataUrl);
    };
  
    return (
      <div className='container-canva'>
        <canvas id="editor-canvas"></canvas>
        <button  onClick={initializeCanvas}>Crear Lienzo</button>
        <button onClick={addText}>Agregar Texto</button>
        <button onClick={saveImage}>Guardar Imagen</button>
      </div>
    );
}

export default CreatePostPicture
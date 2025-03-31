import React from 'react'
import './ImageInput.css'

export default function ImageInput( {className, file, setFile, inputId} ) {
    const [image , setImage] = React.useState(file ? file : '')

    var labelClass = ''

    if (className == 'previewMain') {
        labelClass = 'mainLabel'
    } else if (className == 'previewSub') {
        labelClass = 'subLabel'
    } else {
        labelClass = 'bottomLabel'
    }

    React.useEffect(() => {
        if (file) {
            const objectUrl = typeof file == 'object' ? URL.createObjectURL(file) : file;
            setImage(objectUrl)
        }
            
    }, [file])

    return (
        <div className='imageContainer'>
            <img
                src={image ?? null}
                className={className}
            />
            <label for={inputId} className={`${labelClass} label ${image ? 'fileSelected': ''}`}>Subir Imagen</label>
            <input 
                type='file'
                id={inputId}
                accept="image/*"
                className="visually-hidden"
                onChange={(e) => setFile(e.target.files[0])}
            />
        </div>
    )


}

import React, { Fragment, useState, useRef, useEffect } from 'react'
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from 'lucide-react'
import '../styles/ImageSlider.css'


const ImageSlider = (props) => {
    const [imageIndex, setImageIndex] = useState(0);
    const imageRefs = useRef([]);

    const showPrevImage = () => {
        setImageIndex(index => {
            if (index === 0) return props.imageUrls.length - 1;
            return index - 1;
        })
    }
    const showNextImage = () => {
        setImageIndex(index => {
            if (index == props.imageUrls.length - 1) return 0;
            return index + 1;
        })
    }

    useEffect(() => {
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.01 
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const imageElement = entry.target;
                    imageElement.src = imageElement.dataset.src;
                    observer.unobserve(imageElement);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        
        imageRefs.current.forEach(image => {
            observer.observe(image);
        });

        return () => {
            observer.disconnect();
        };
    }, [props.imageUrls]);

    return (
        <Fragment>
            <div className='imgslider'>
                <div className='imgslider_image_wrapper'>
                    {props.imageUrls.map((url, index) => (
                        <img 
                            key={url} 
                            ref={el => (imageRefs.current[index] = el)}
                            data-src={url}
                            className='imgslider_image' 
                            style={{translate: `${-100*imageIndex}%`}}
                            aria-label={`Image # ${index + 1}`}
                            alt={`Image #${index + 1}`}
                        />
                    ))}
                </div>
                <button 
                    onClick={showPrevImage} 
                    className='imgslider_btn' 
                    style={{left: 0}}
                    aria-label='View Previous Image'
                >
                    <ArrowBigLeft aria-hidden/>
                </button>
                <button 
                    onClick={showNextImage} 
                    className='imgslider_btn' 
                    style={{right: 0}}
                    aria-label='View Next Image'
                >
                    <ArrowBigRight aria-hidden/>
                </button>
                <div className='imgslider_dots'>
                    {props.imageUrls.map((_, index) =>(
                        <button 
                            key={index} 
                            onClick={() => setImageIndex(index)} 
                            className='imgslider_dot_btn'
                            aria-label={`View Image ${index + 1}`}
                        >
                            {index === imageIndex ? <CircleDot aria-hidden/> : <Circle aria-hidden/>}
                        </button>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default ImageSlider
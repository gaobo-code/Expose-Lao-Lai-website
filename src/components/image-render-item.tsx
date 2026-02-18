import React, { useState, useRef, useContext, TouchEvent, Touch, useEffect, MouseEventHandler } from 'react';
import Image from "next/image";
import { EmblaCarouselContext } from '@/lib/context';
// import Script from 'next/script';

type Props = {
    index: number;
    total: number;
    url: string;
    title: string;
    width: number;
    height: number;
};

// drag direction
enum Direction {
    Up,
    Down,
    Left,
    Right,
    Null
}

// Minimum zoom ratio for images
const MIN_SCALE = 1;
// Maximum zoom ratio for images
const MAX_SCALE = 3;
const SCROLL_RANGE = 10;
// If the dragging distance exceeds this value, it can be judged as image switching
const SCROLL_THRESHOLD = 50;
// Control the movement speed of the image when dragging it
const DRAG_SCALE = 1.3;

// On the phone, click on the image to enter the image carousel. This component can zoom in and drag to view the image
export default function ImageRenderItem({ index, total, url, title, width, height }: Props) {

    const [finalWidth, setFinalWidth] = useState(0);
    const [finalHeight, setFinalHeight] = useState(0);
    const [finalInitWidth, setFinalInitWidth] = useState(0);
    const [finalInitHeight, setFinalInitHeight] = useState(0);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);

    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLImageElement>(null);

    const isDrag = useRef(false);
    const isPinching = useRef(false);

    // State for pinch (two-finger)
    const scale = useRef(1);
    const scrollX = useRef(0);
    const scrollY = useRef(0);

    // States for drag (one-finger)
    const dragStartX = useRef(0);
    const dragStartY = useRef(0);
    const dragPositionX = useRef(0);
    const dragPositionY = useRef(0);

    const pinchInitialDistance = useRef(0);
    const pinchInitialScale = useRef(1);

    const emblaCarouselContext = useContext(EmblaCarouselContext)

    // Determine the initial size of the image within the parent element
    useEffect(() => {
        let parentWidth = window.innerWidth;
        let parentHeight = window.innerHeight - 8;
        let parentRadio = parentWidth / parentHeight;
        let childRadio = width / height;
        let sWidth = null;
        let sHeight = null;

        if (parentRadio < childRadio) {
            sWidth = Math.round(parentWidth);
            sHeight = Math.round(parentWidth * height / width)

        } else {
            sHeight = Math.round(parentHeight);
            sWidth = Math.round(parentHeight * childRadio);
        }

        setFinalWidth(sWidth);
        setFinalHeight(sHeight);
        setFinalInitWidth(sWidth);
        setFinalInitHeight(sHeight);
        setParentWidth(Math.round(parentWidth));
        setParentHeight(Math.round(parentHeight));

    }, []);

    const scrollTo = (top: number, left: number) => {
        containerRef.current!.scrollTo({ top: top, left: left });
    }

    const getDragDirection = (dx: number, dy: number) => {
        let dragDirection = Direction.Null;

        if (dx > 0 && dy > 0) {
            if (dx > 2 * dy) {
                dragDirection = Direction.Right;
            } else if (dy > 2 * dx) {
                dragDirection = Direction.Up;
            }

        } else if (dx > 0 && dy < 0) {
            if (dx > 2 * Math.abs(dy)) {
                dragDirection = Direction.Right;
            } else if (Math.abs(dy) > 2 * dx) {
                dragDirection = Direction.Down;
            }

        } else if (dx < 0 && dy > 0) {
            if (Math.abs(dx) > 2 * dy) {
                dragDirection = Direction.Left;
            } else if (dy > 2 * Math.abs(dx)) {
                dragDirection = Direction.Up;
            }
        } else {
            if (Math.abs(dx) > 2 * Math.abs(dy)) {
                dragDirection = Direction.Left;
            } else if (Math.abs(dy) > 2 * Math.abs(dx)) {
                dragDirection = Direction.Down;
            }
        }

        return dragDirection;
    }

    const getDragDistance = (dx: number, dy: number) => {
        return Math.hypot(dx, dy);
    }

    const isDragExceedThreshold = (dx: number, dy: number) => {
        let distance = getDragDistance(dx, dy);
        if (distance > SCROLL_THRESHOLD) return true;
        else return false;
    }

    // When switching to the next image, the previous image returns to its initial state
    const resetState = () => {
        
        scale.current = 1;
        scrollX.current = 0;
        scrollY.current = 0;

        dragStartX.current = 0;
        dragStartY.current = 0;
        dragPositionX.current = 0;
        dragPositionY.current = 0;

        pinchInitialDistance.current = 0;
        pinchInitialScale.current = 1;

        setFinalWidth(finalInitWidth);
        setFinalHeight(finalInitHeight);
    }

    // Switch to the next image
    const goToNext = () => { 
        emblaCarouselContext?.goToNext(resetState);
    }

    // Switch to the next image
    const goToPrev = () => {
        emblaCarouselContext?.goToPrev(resetState);
    }

    // Handle touch start (initialize touch positions)
    const handleTouchStart = (e: React.TouchEvent) => {

        if (e.touches.length === 1) {

            dragStartX.current = e.touches[0].clientX;
            dragStartY.current = e.touches[0].clientY;

            isDrag.current = true;

        } else if (e.touches.length === 2) {

            // Pinch-to-zoom (calculate initial distance between two touches)
            const distance = getDistanceBetweenTouches(e.touches[0], e.touches[1]);
            pinchInitialDistance.current = distance;
            pinchInitialScale.current = scale.current;

            isPinching.current = true;
        }

    };

    // Handle touch move (update scale for zoom and position for drag)
    const handleTouchMove = (e: React.TouchEvent) => {

        if (e.touches.length === 1 && isDrag.current) {
            if (isPinching.current) return;

            // Dragging the image (swiping)
            let dx = (e.touches[0].clientX - dragStartX.current) * DRAG_SCALE;
            let dy = (e.touches[0].clientY - dragStartY.current) * DRAG_SCALE;

            if (scale.current > 1) {

                let finalLeft = scrollX.current - dx;
                let finalTop = scrollY.current - dy;

                finalLeft = Math.max(finalLeft, 0);
                finalTop = Math.max(finalTop, 0);
                finalLeft = Math.min(finalLeft, finalWidth - parentWidth);
                finalTop = Math.min(finalTop, finalHeight - parentHeight);

                dragPositionX.current = finalLeft;
                dragPositionY.current = finalTop;

                scrollTo(finalTop, finalLeft);
            }

        } else if (e.touches.length === 2 && isPinching.current) {

            // Pinch-to-zoom (calculate new scale based on the distance between touches)
            const distance = getDistanceBetweenTouches(e.touches[0], e.touches[1]);
            const scaleChange = distance / pinchInitialDistance.current;
            const newScale = pinchInitialScale.current * scaleChange;
            
            // Limiting the scale (zoom) to a reasonable range
            const limitedScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
            scale.current = limitedScale;

            let finalWidth = Math.round(finalInitWidth * limitedScale);
            let finalHeight = Math.round(finalInitHeight * limitedScale);

            setFinalWidth(finalWidth);
            setFinalHeight(finalHeight);

        }
    };

    // Handle touch end (reset touch states)
    const handleTouchEnd = (e: React.TouchEvent) => {

        if (isPinching.current) {

            isPinching.current = false;

            return;
        }

        if (isDrag.current) {

            let dx = e.changedTouches[0].clientX - dragStartX.current;
            let dy = e.changedTouches[0].clientY - dragStartY.current;

            let dragDirection = getDragDirection(dx, dy);
            let isDragExceed = isDragExceedThreshold(dx, dy);

            if (scale.current === 1) {
                if (isDragExceed && dragDirection === Direction.Left) {
                    goToNext();
                    return;
                } else if (isDragExceed && dragDirection === Direction.Right) {
                    goToPrev();
                    return;
                }
            } else {
                if (isDragExceed && scrollX.current < SCROLL_RANGE && dragDirection === Direction.Right) {
                    goToPrev();
                    return;
                }

                if (isDragExceed && scrollX.current > finalWidth - parentWidth - SCROLL_RANGE && dragDirection === Direction.Left) {
                    goToNext();
                    return;
                }

                scrollX.current = dragPositionX.current;
                scrollY.current = dragPositionY.current;
            }

            dragStartX.current = 0;
            dragStartY.current = 0;
            dragPositionX.current = 0;
            dragPositionY.current = 0;

            isDrag.current = false;

            return;
        }
    };

    // Function to calculate distance between two touch points
    const getDistanceBetweenTouches = (touch1: Touch, touch2: Touch) => {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.pow(dx * dx + dy * dy, 1 / 5);
    };

    return (
        <>
            <div className="text-[#2F97D8] text-sm font-bold absolute top-1 left-1 z-100">
                {index + 1}/{total}
            </div>
            <div ref={containerRef} className="w-screen flex-1 relative touch-action-none overflow-auto grid place-items-center" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                {
                    finalWidth != 0 && finalHeight != 0 && <div ref={imgRef}
                        data-initwidth={finalInitWidth}
                        data-initheight={finalInitHeight}
                        style={{
                            zIndex: 60,
                            transition: 'width 0.2s ease, height 0.2s ease',
                            width: finalWidth,
                            height: finalHeight,
                            position: 'relative'
                        }}
                    >
                        <Image
                            src={url}
                            alt={title}
                            fill
                            sizes="100vw"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                }
            </div>
            {/* <Script
                src="https://cdn.jsdelivr.net/npm/eruda"
                strategy="afterInteractive"
                onLoad={() => {
                    // @ts-ignore
                    window.eruda?.init();
                }}
            /> */}
        </>
    )
}   
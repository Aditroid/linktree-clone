'use client';

export default function ProfileImage({ src, alt, className }) {
    const handleError = (e) => {
        e.target.onerror = null;
        e.target.src = '/default-avatar.png';
    };

    return (
        <img 
            src={src || '/default-avatar.png'} 
            alt={alt || 'Profile'} 
            className={className}
            onError={handleError}
        />
    );
}

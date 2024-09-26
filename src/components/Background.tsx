import React from 'react';

interface BackgroundProps {
    children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    const svgWave = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2048 1145" width="557" height="313">
<path transform="translate(0)" d="m0 0h2048v1145h-2048z" fill="#FEFFFE"/>
<path transform="translate(2047)" d="m0 0h1v1145h-2048v-549l20 2 25 5 24 8 34 14 21 7 23 5 26 3h33l21-3 19-5 16-6 17-9 13-8 19-11 15-7 15-5 25-5 8-1h33l26 4 21 6 21 9 28 15 19 10 15 6 22 6 18 3 11 1h30l27-4 21-6 21-9 22-12 16-9 17-8 19-6 25-5 8-1h33l21 3 19 5 20 8 22 12 17 10 16 8 15 6 21 5 22 3h31l27-4 20-6 18-8 23-13 21-12 19-8 18-5 25-4h33l26 4 20 6 21 9 24 13 19 10 15 7 20 6 15 3 17 2h32l27-4 21-6 17-7 19-10 18-10 24-11 19-6 25-5 8-1h34l25 4 17 5 20 9 38 22 16 8 21 7 22 4 10 1h34l25-3 25-6 20-7 31-13 21-7 28-6 19-2 17-1 1-574z" fill="#0280FE"/>
</svg>
    `;

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svgWave)}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
    };

    return <div style={backgroundStyle}>{children}</div>;
};

export default Background;

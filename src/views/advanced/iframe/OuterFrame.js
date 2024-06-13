import React from 'react';

const OuterIframe = () => {
    return (
        <iframe
            title="OuterIframe"
            srcDoc={`<html>
                        <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                            <iframe
                                title="InnerIframe"
                                src="#/sample2"
                                style="width: 100%; height: 300px; border: none;"
                            ></iframe>
                        </body>
                    </html>`}
            style={{ width: '100%', height: '400px', border: 'none' }}
        />
    );
};

export default OuterIframe;

import React from 'react';
import InnerIframe from './InnerFrame';

const OuterIframe = () => {
    return (
        <iframe
            title="OuterIframe"
            srcDoc={`<html>
                        <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                            <iframe
                                title="InnerIframe"
                                src="#/sample2"
                                width="500"
                                height="300"
                                style="border: none;"
                            ></iframe>
                        </body>
                    </html>`}
            width="600"
            height="400"
            style={{ border: 'none' }}
        />
    );
};

export default OuterIframe;

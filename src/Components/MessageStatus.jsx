import React from 'react'

export default function MessageStatus({statusServer, statusReading, ...props}) {
    let serverStyleRoot = ['message-point'];
    let readingStyleRoot = ['message-point'];
    
    if(statusServer) serverStyleRoot.push('active');
    if(statusReading) readingStyleRoot.push('active');

    return (
        <div className='message-status'>
            <div className={serverStyleRoot.join(' ')}></div>
            <div className={readingStyleRoot.join(' ')}></div>
        </div>
    )
}

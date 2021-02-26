import React from 'react';

export default function ProviderView({user}) {
    return (
        <div>
            <h1>{user.username} logged in</h1>
        </div>
    )
}
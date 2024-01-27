import React, { useState } from 'react';
import { Container, TextInput, Button } from '@mantine/core';

import { AUTHENTICATE_ENDPOINT } from './urls';

async function postUser(username, password) {
    const body = {
      name: username,
      password: password
    }
  
    const response = await window.fetch(AUTHENTICATE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    
    return data
  }

export function ChatLogin({hideLogin, setUser, setUserName}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('password');

    async function login() {
        const data = await postUser(username, password);
        
        setUser(data.id);
        setUserName(data.name);

        hideLogin(true);
    }

    return (
        <Container size="sm" className='text-center'>
            <h2>Login</h2>

            <TextInput
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className='mt-[15px]'
            />
            <TextInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className='mt-[15px]'
            />
            <Button
                onClick={login}
                variant='outline'
                className='mt-[50px]'>
                Login
            </Button>
        </Container>
    )
}
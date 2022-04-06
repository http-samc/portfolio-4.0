import { Spacer, Text } from '@geist-ui/core'
import { Github } from '@geist-ui/icons'
import Link from 'next/link'
import React from 'react'

const GithubProfile = (props: any) => {
    return (
        <Link href='https://github.com/http-samc'>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#121212',
                paddingRight: 5,
                paddingLeft: 5,
                paddingTop: -5,
                borderRadius: 5,
                width: 'fit-content',
                border: '1px solid #fff',
            }}>
                <Github color='#fff' />
                <Spacer w={0.5} />
                <Text style={{ color: '#fff', fontSize: 18 }}>http-samc</Text>
            </div>
        </Link>
    )
}

export default GithubProfile
import RenderedMarkdown from "../components/renderedMarkdown"
import fs from 'fs'
import TextTransition, { presets } from "react-text-transition"
import { useState, useEffect } from 'react'
import { Image, Text } from "@geist-ui/core";
import { ChevronDown } from "@geist-ui/icons";
// import GithubProfile from "../components/githubProfile";

const ADJECTIVES = [
    "developer",
    "bulls fan",
    "student",
    "debater",
    "swimmer"
];

export const getStaticProps = async (context: any) => {
    const homepage = fs.readFileSync(`${process.cwd()}/content/index.md`, 'utf8')

    return {
        props: {
            homepage
        }
    }
}

const Home = ({ homepage }: any) => {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            3000 // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <div>
            <Text h1>I'm Samarth Chitgopekar</Text>
            <Text h3>
                a&nbsp;
                <TextTransition
                    text={ADJECTIVES[index % ADJECTIVES.length]}
                    springConfig={presets.stiff}
                    inline={true}
                    style={{
                        textDecoration: 'underline',
                        color: '#0070f3'
                    }}
                />
                &nbsp;from 📍 Chicago, IL
            </Text>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: 50 }}>
                <Image
                    style={{ borderRadius: '50%' }}
                    src="https://avatars.githubusercontent.com/u/67826352?s=200"
                />
            </div>
            <RenderedMarkdown
                markdown={homepage}
                ignoreCustomComponents={true}
            />
        </div>
    )
}

export default Home

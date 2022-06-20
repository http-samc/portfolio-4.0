import RenderedMarkdown from "../components/renderedMarkdown"
import fs from 'fs'
import TextTransition, { presets } from "react-text-transition"
import { useState, useEffect } from 'react'
import { Image, Text } from "@geist-ui/core";
import { ChevronDown } from "@geist-ui/icons";
import { useMediaQuery } from "usehooks-ts";
// import GithubProfile from "../components/githubProfile";

const ADJECTIVES = [
    "bulls fan",
    "comedian",
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
    const isBig = useMediaQuery('(min-width: 700px)')
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
            <div style={
                isBig
                    ? { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 50, marginBottom: 50 }
                    : { display: 'flex', flexDirection: 'column', alignItems: 'center' }
            }>
                <div>
                    <Text h2={isBig} h1={!isBig} style={{ fontWeight: 'bolder', fontSize: '2.5rem' }}>I'm Samarth Chitgopekar</Text>
                    <Text h3 mt={1}>
                        a&nbsp;
                        <TextTransition
                            text={ADJECTIVES[index % ADJECTIVES.length]}
                            springConfig={presets.stiff}
                            inline={true}
                        />
                        &nbsp;from 📍 Chicago, IL
                    </Text>
                    <Text p i b mt={-0.5} mb={isBig ? 0 : 3} style={{ color: '#888', width: isBig ? '70%' : '100%' }}>
                        Fullstack developer coding to make the world a better place (and building some awesome stuff along the way).
                    </Text>
                </div>
                <div style={{ width: isBig ? '30%' : '100%' }} className={!isBig ? "hero-img" : ""}>
                    <Image
                        style={{ borderRadius: '50%', maxHeight: isBig ? 130 : 200 }}
                        alt="Sam's User Avatar"
                        src="https://avatars.githubusercontent.com/u/67826352?s=200"
                    />
                </div>
            </div>
            <RenderedMarkdown
                markdown={homepage}
                ignoreCustomComponents={true}
            />
        </div>
    )
}

export default Home

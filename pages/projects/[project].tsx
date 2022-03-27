import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer } from "@geist-ui/core";
import getRandomThemeColor from "../../utils/get-random-theme-color";
const yfm = require('yaml-front-matter')
import fs from 'fs'

export const getStaticPaths = async () => {
    let projectPaths = fs.readdirSync(`${process.cwd()}/content/projects`)
    let paths = projectPaths.map((project: string) => {
        return { params: { project: project.replace('.md', '') } }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const { project } = context.params;
    const projectText = fs.readFileSync(`${process.cwd()}/content/projects/${project}.md`, 'utf8')
    return {
        props: {
            project: projectText
        }
    }
}

const Project = ({ project }: any) => {
    const parsedProject = yfm.loadFront(project)
    return (
        <div>
            <Text h1>{parsedProject.title}</Text>
            <Text i>{parsedProject.description}</Text>
            <Spacer />
            {
                parsedProject.tags.map((tag: string, idx: number) => {
                    return <Badge
                        style={{
                            backgroundColor: getRandomThemeColor(),
                            marginRight: '5px',
                            marginBottom: '5px'
                        }}
                        key={idx.toString()}
                    >
                        {tag}
                    </Badge>
                })
            }
            <Spacer h={2} />
            {
                parsedProject.cover
                    ?
                    <div className='cover-img-container'>
                        <img className="cover-img" src={parsedProject.cover} />
                        <Spacer h={2} />
                    </div>
                    : null
            }
            <RenderedMarkdown
                markdown={parsedProject.__content}
            />
        </div>
    )
}

export default Project
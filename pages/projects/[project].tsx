import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Display } from "@geist-ui/core";
import getRandomThemeColor, { COLORS } from "../../utils/get-random-theme-color";
const yfm = require('yaml-front-matter')
import fs from 'fs'
import hash from "../../utils/hash";
import PageLayout from "../../layout/page";

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

const Project = ({ project, setTheme }: any) => {
    const parsedProject = yfm.loadFront(project)
    return (
        <PageLayout setTheme={setTheme}>
            <Text h1>{parsedProject.title}</Text>
            <Text>
                <span style={{ fontStyle: 'italic' }}>{parsedProject.description.slice(0, parsedProject.description.length - 2)}</span>
                {parsedProject.description.slice(parsedProject.description.length - 2, parsedProject.description.length)}
            </Text>
            <Spacer />
            {
                parsedProject.tags.map((tag: string, idx: number) => {
                    let pos = tag.length;
                    for (let c of hash(tag)) {
                        if (parseInt(c))
                            pos += parseInt(c)
                        else
                            pos += c.charCodeAt(0)
                    }
                    let color = COLORS[pos % COLORS.length]
                    return <Badge
                        style={{
                            backgroundColor: color,
                            marginRight: '5px',
                            marginBottom: '5px',
                            color: 'white',
                            textAlign: 'center',
                        }}
                        key={idx.toString()}
                        className={tag}
                    >
                        {tag}
                    </Badge>
                })
            }
            <Spacer h={2} />
            <RenderedMarkdown
                markdown={parsedProject.__content}
            />
        </PageLayout>
    )
}

export default Project
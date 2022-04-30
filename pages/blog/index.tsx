import RenderedMarkdown from "../../components/renderedMarkdown"
import { Text, Badge, Link, Image, Spacer, Grid, Card, Snippet, Collapse, Input, Button, Modal } from "@geist-ui/core";
import getRandomThemeColor, { COLORS } from "../../utils/get-random-theme-color";
import { useRouter } from "next/router";
const yfm = require('yaml-front-matter')
import fs from 'fs'
import hash from '../../utils/hash'
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Search } from "@geist-ui/icons";

const getStaticPaths = () => {
    let postPaths = fs.readdirSync(`${process.cwd()}/content/blog`)
    return postPaths
}

export const getStaticProps = (context: any) => {
    const posts = getStaticPaths()
    const data: any = []
    for (const post of posts) {
        let text = fs.readFileSync(`${process.cwd()}/content/blog/${post}`, 'utf8')
        data.push({ ...yfm.loadFront(text), ...{ urlPath: post.replace('.md', '') } })
    }
    return {
        props: {
            posts: data
        }
    }
}

const Blog = ({ posts, theme }: any) => {
    const router = useRouter()
    const [tags, setTags] = useState<string[]>([])
    const [visibleTag, setVisibleTag] = useState<string>('all')
    const isSmall = useMediaQuery('(max-width: 670px)')
    const [showSearch, setShowSearch] = useState(false)
    const [search, setSearch] = useState('')

    return (
        <div>
            <div style={{
                display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', alignItems: 'center'
            }}
            >
                <Text h1>My Blog 📒</Text>
                {!isSmall &&
                    <Input
                        htmlType="search"
                        placeholder="search..."
                        iconRight={<Search />}
                        scale={isSmall ? 1 : 1.5}
                        onChange={(e: any) => setSearch(e.target.value)}
                        value={search}
                    />
                }
                {isSmall &&
                    <Button
                        auto
                        ghost
                        type='secondary'
                        icon={<Search />}
                        onClick={() => setShowSearch(true)}
                    />
                }
                <Modal visible={showSearch}>
                    <Input
                        htmlType="search"
                        placeholder="search..."
                        iconRight={<Search />}
                        scale={isSmall ? 1 : 1.5}
                        onChange={(e: any) => setSearch(e.target.value)}
                        value={search}
                        width='100%'
                    />
                    <Modal.Action onClick={() => { setSearch(''); setShowSearch(false) }}>
                        Cancel
                    </Modal.Action>
                    <Modal.Action onClick={() => setShowSearch(false)}>
                        Submit
                    </Modal.Action>
                </Modal>
            </div>
            <div className="grid-filter">
                <span
                    style={{
                        marginRight: '5px',
                        marginBottom: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        userSelect: 'none'
                    }}
                    onClick={() => setVisibleTag('all')}
                >
                    #all
                </span>
                {
                    tags.map((tag: string, idx: number) => {
                        let pos = tag.length;
                        for (let c of hash(tag)) {
                            if (parseInt(c))
                                pos += parseInt(c)
                            else
                                pos += c.charCodeAt(0)
                        }
                        let color = COLORS[pos % COLORS.length]

                        return <span
                            style={{ color: color, userSelect: 'none', backgroundColor: tag == visibleTag ? '#f5f5f5' : '', borderRadius: 5 }}
                            key={idx.toString()}
                            className={tag}
                            onClick={() => setVisibleTag(tag)}
                        >
                            #{tag}
                        </span>
                    })
                }
            </div>
            <Spacer h={1} />
            <Grid.Container gap={2} justify='center' direction="row">
                {
                    posts.map((post: any, idx: number) => {
                        if (search) {
                            if (!post.title.toLowerCase().includes(search.toLowerCase()))
                                return null
                        }
                        return (
                            <Grid xs={24} md={8} lg={post.important ? 14 : 10} width="100%" key={idx} style={{
                                display: post.tags.includes(visibleTag) || visibleTag == 'all' ? 'block' : 'none'
                            }}>

                                <Card
                                    width="100%"
                                    height="auto"
                                    className="card"
                                    onClick={() => {
                                        router.push(`/blog/${post.urlPath}`)
                                    }}
                                    shadow
                                    style={{ backgroundImage: `url(${post.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                >
                                    <Badge.Anchor>
                                        <Badge style={{ marginBottom: 5, marginRight: 5 }} type='error'>
                                            {post.date.split('/')[0] + '/' + post.date.split('/')[1]}
                                        </Badge>
                                        <div>
                                            <Badge style={{
                                                fontSize: '1.2rem',
                                                borderRadius: 5,
                                                backgroundColor: theme == 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                                                color: theme == 'light' ? 'black' : 'white',
                                            }}>
                                                {post.title}
                                            </Badge>
                                        </div>
                                    </Badge.Anchor>
                                    <Spacer />
                                    {
                                        post.tags.map((tag: string, idx: number) => {
                                            tags.includes(tag) || setTags([...tags, tag])
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
                                                    color: 'white'
                                                }}
                                                key={idx.toString()}
                                                className={tag}
                                            >
                                                {tag}
                                            </Badge>
                                        })
                                    }
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid.Container>
            <Spacer h={2} />
        </div>
    )
}

export default Blog

import { Text } from "@geist-ui/core"

const PageNotFound = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left' }}>
            <Text h1 type="error">Yikes 😳</Text>
            <Text type="secondary">That page couldn't be found. It might have been moved, but have no fear: there's a bunch of other cool stuff to check out!</Text>
            <Text i>— Sam Chitgopekar 💯</Text>
        </div>
    )
}

export default PageNotFound
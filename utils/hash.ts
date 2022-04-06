import { createHash } from "crypto";

const hash = (str: string) => {
    return createHash("sha256")
        .update(str)
        .digest("hex");
};

export default hash

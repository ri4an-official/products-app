import { ReactNode, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, withReact } from 'slate-react'

type Props = {
	value: Descendant[]
	onChange?: (v: Descendant[]) => void
	children: ReactNode
}

const HtmlEditor = (props: Props) => {
	const [editor] = useState(() => withReact(createEditor()))

	return <Slate editor={editor} {...props} />
}
export default HtmlEditor

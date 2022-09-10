import { EditorState, Modifier } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useEffect, useRef, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './HtmlEditor.css'

type Props = {
	description: string
	setDescription: (desc: string) => void
}

const HtmlEditor = ({ description, setDescription }: Props) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const ref = useRef(null)

	const sendTextToEditor = (text: string) => {
		const insertText = (text: string, editorValue: EditorState) => {
			const currentContent = editorValue.getCurrentContent()
			const currentSelection = editorValue.getSelection()

			const newContent = Modifier.replaceText(
				currentContent,
				currentSelection,
				text
			)

			const newEditorState = EditorState.push(
				editorValue,
				newContent,
				'insert-characters'
			)
			return EditorState.forceSelection(
				newEditorState,
				newContent.getSelectionAfter()
			)
		}
		setEditorState(insertText(text, editorState))
	}

	const onEditorStateChange = (es: EditorState) => {
		setEditorState(es)
		setDescription((ref.current as any).editor.editor.innerHTML)
		console.log((ref.current as any).editor.editor.innerHTML)
	}

	useEffect(() => {
		if (!description.includes('<')) return
		;(ref.current as any).editor.editor.innerHTML = description
	}, [])

	return (
		<Editor
			{...{ editorState, onEditorStateChange, ref }}
			toolbarClassName='toolbarClassName'
			wrapperClassName='wrapperClassName'
			editorClassName='editor'
		/>
	)
}
export default HtmlEditor

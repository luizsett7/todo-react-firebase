import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

interface EditorProps {
    temporaryNoteText: string;
    setTemporaryNoteText: (text: string) => void;
}

const Editor: React.FC<EditorProps> = ({ temporaryNoteText, setTemporaryNoteText }) => {
    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    });

    return (
        <section className="pane editor">
            <ReactMde
                value={temporaryNoteText}
                onChange={setTemporaryNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown: string) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    );
};

export default Editor;
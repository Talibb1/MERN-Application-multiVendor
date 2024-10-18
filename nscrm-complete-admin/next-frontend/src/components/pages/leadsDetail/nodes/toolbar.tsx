import { MdFormatListBulleted } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { TbBlockquote } from "react-icons/tb";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaLink,
} from "react-icons/fa";

const Toolbar = ({ editor }: any) => {
    if (!editor) return null;
  
    return (
      <div className="flex space-x-2 mb-2">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
        >
          <strong>B</strong>
        </button>
  
        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
        >
          <em>I</em>
        </button>
  
        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor.isActive("underline") ? "bg-gray-200" : ""
          }`}
        >
          <u>U</u>
        </button>
  
        {/* Strike-through */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            editor.isActive("strike") ? "bg-gray-200" : ""
          }`}
        >
          <s>S</s>
        </button>
  
        {/* Highlight */}
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded ${
            editor.isActive("highlight") ? "bg-gray-200" : ""
          }`}
        >
          <span style={{ background: "yellow" }}>H</span>
        </button>
  
        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
        >
          <MdFormatListBulleted />
        </button>
  
        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
        >
          <VscListOrdered />
        </button>
  
        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive("blockquote") ? "bg-gray-200" : ""
          }`}
        >
          <TbBlockquote />
        </button>
  
        {/* Align Left */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
          }`}
        >
          <FaAlignLeft />
        </button>
  
        {/* Align Center */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
          }`}
        >
          <FaAlignCenter />
        </button>
  
        {/* Align Right */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
          }`}
        >
          <FaAlignRight />
        </button>
  
        {/* Add Link */}
        <button
          onClick={() => {
            const url = prompt("Enter the link URL:");
            editor
              .chain()
              .focus()
              .toggleLink({ href: url || "" })
              .run();
          }}
          className={`p-2 rounded`}
        >
          <FaLink />
        </button>
      </div>
    );
  };

  export default Toolbar;
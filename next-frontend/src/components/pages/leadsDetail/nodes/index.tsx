"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/custom/button";
import { FiSend } from "react-icons/fi";
import Toolbar from "./toolbar";
import SavedNotesList from "./savedNotesList";
import { useCreateNotes, useGetNotesByLeadId } from "@/lib/hooks/api";

const NotesComponent = ({ leadId }: { leadId: number }) => {
  const [noteContent, setNoteContent] = useState("");
  const createNotes = useCreateNotes();

  const { data: notesData, refetch } = useGetNotesByLeadId(leadId);

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      setNoteContent(editor.getHTML());
    },
  });

  const handleSend = async () => {
    if (!noteContent.trim()) return;


    await createNotes.mutateAsync({
      leadId,
      notes: noteContent,
    });


    editor?.commands.clearContent();
    refetch();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">Notes</h2>

      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="border p-4 rounded mb-2 min-h-[200px] max-h-[400px] overflow-y-auto bg-gray-100"
        style={{ whiteSpace: "pre-wrap", caretColor: "black" }}
      />

      <div className="flex items-center justify-between">
        <Button
          className="p-2 bg-black text-white hover:bg-gray-800 flex items-center"
          onClick={handleSend}
        >
          <FiSend className="h-5 w-5 mr-2" />
          <span>Save Note</span>
        </Button>
      </div>

      {/* Display saved notes */}
      <SavedNotesList notes={notesData?.data || []} />
    </div>
  );
};

export default NotesComponent;

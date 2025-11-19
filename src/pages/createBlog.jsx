import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, FileText, User, Image as ImageIcon, FolderOpen, Tag, Sparkles, Heart } from "lucide-react";
import * as z from "zod";
import MenuBar from "../components/menubar";

const extensions = [TextStyleKit, StarterKit];

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters"),

  expert: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name must be less than 100 characters"),

  content: z.string().min(10, "Content must be at least 10 characters"),

  category: z.string().min(2, "Category is required"),

  tags: z
    .string()
    .optional()
    .refine(
      (tags) => !tags || tags.split(",").length <= 10,
      "10 tags at max are allowed."
    ),

  image: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Please select a valid image file"
    )
    .refine(
      (file) => !file || file?.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => !file || file?.type?.startsWith("image/"),
      "File must be an image"
    )
    .optional(),
});

const CreateBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      expert: "",
      content: "",
      category: "",
      tags: "",
      image: null,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = form;

  const editor = useEditor({
    extensions: extensions,
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
      if (editor.getHTML().length >= 10) {
        clearErrors("content");
      }
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editor) {
        data.content = editor.getHTML();
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("expert", data.expert);
      formData.append("content", data.content);
      formData.append("category", data.category);
      formData.append("tags", data.tags);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await fetch("http://localhost:8080/api/v1/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("failed to create blog");

      const result = await response.json();

      console.log("Blog Created:", result);

      alert("Your wedding story has been shared successfully! 💐");

      form.reset();
      if (editor) {
        editor.commands.setContent("");
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to share your story. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("image", file);
    clearErrors("image");

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setValue("image", null);

    const fileInput = document.getElementById("image");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const currentImage = watch("image");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-rose-500" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-rose-900 mb-3">
              Share Your Wedding Story
            </h1>
            <p className="text-lg text-gray-600">
              Inspire other couples with your tips, experiences, and beautiful moments
            </p>
          </div>

          <form
            className="bg-white border-2 border-rose-200 rounded-2xl shadow-lg p-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-semibold text-gray-800"
              >
                <FileText className="h-5 w-5 text-rose-500" />
                Story Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g., Our Dream Garden Wedding in Tuscany"
                className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-rose-600 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.title.message}
                </p>
              )}
            </div>

            {/* Expert/Author */}
            <div className="space-y-2">
              <label
                htmlFor="expert"
                className="flex items-center gap-2 text-sm font-semibold text-gray-800"
              >
                <User className="h-5 w-5 text-rose-500" />
                Your Name
              </label>
              <input
                type="text"
                name="expert"
                id="expert"
                placeholder="e.g., Sarah & Michael"
                className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white"
                {...register("expert")}
              />
              {errors.expert && (
                <p className="text-rose-600 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.expert.message}
                </p>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Heart className="h-5 w-5 text-rose-500" fill="currentColor" />
                Your Story
              </label>
              <div className="border-2 border-rose-200 rounded-xl overflow-hidden">
                <MenuBar editor={editor} />
                <EditorContent
                  editor={editor}
                  className="prose max-w-none p-4 min-h-[250px] focus:outline-none bg-white"
                />
              </div>
              {errors.content && (
                <p className="text-rose-600 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.content.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="flex items-center gap-2 text-sm font-semibold text-gray-800"
              >
                <FolderOpen className="h-5 w-5 text-rose-500" />
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white"
                {...register("category")}
              >
                <option value="">Select a category</option>
                <option value="Venue">Venue Ideas</option>
                <option value="Planning">Planning Tips</option>
                <option value="Photography">Photography</option>
                <option value="Catering">Catering & Food</option>
                <option value="Decor">Decor & Styling</option>
                <option value="Fashion">Fashion & Beauty</option>
                <option value="Budget">Budget & Savings</option>
                <option value="Real Wedding">Real Wedding Story</option>
                <option value="Destination">Destination Wedding</option>
                <option value="DIY">DIY Projects</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-rose-600 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.category.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="flex items-center gap-2 text-sm font-semibold text-gray-800"
              >
                <Tag className="h-5 w-5 text-rose-500" />
                Tags (Optional)
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="e.g., outdoor wedding, rustic, budget-friendly, summer"
                className="border-2 border-rose-200 block w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all bg-white"
                {...register("tags")}
              />
              <p className="text-sm text-gray-500">
                Separate tags with commas. Maximum 10 tags.
              </p>
              {errors.tags && (
                <p className="text-rose-600 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.tags.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="flex items-center gap-2 text-sm font-semibold text-gray-800"
              >
                <ImageIcon className="h-5 w-5 text-rose-500" />
                Featured Image (Optional)
              </label>

              <div>
                {!currentImage ? (
                  <div className="border-2 border-dashed border-rose-300 rounded-xl p-10 text-center hover:border-rose-400 hover:bg-rose-50 transition-all">
                    <Upload className="mx-auto h-14 w-14 text-rose-400 mb-4" />
                    <div className="mb-4">
                      <span className="block text-base font-semibold text-gray-900 mb-2">
                        Upload a beautiful photo
                      </span>
                      <span className="block text-sm text-gray-600">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </div>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("image")?.click()}
                      className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-md font-medium"
                    >
                      Select Image
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-rose-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-80 object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-3 right-3 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors shadow-lg"
                      onClick={removeImage}
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-4 py-2 text-sm rounded-lg">
                      {currentImage?.name}
                    </div>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-rose-600 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.image.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Sharing Your Story...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Share Your Story
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            By sharing your story, you agree to inspire and help other couples planning their special day 💕
          </p>
        </div>
      </section>
    </main>
  );
};

export default CreateBlog;
import { zodResolver } from "@hookform/resolvers/zod"
import { use } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"

const formSchema = z.object({
    username: z.string().min(2,{
        message: 'Too short.'
    }),
})



const PostForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values);
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
            control={form.control}
            name="caption"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Caption</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Enter your caption here" className="shad-text-area custom-scrollbar" {...field} />
                    </FormControl>
                    <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />

        <FormField
            control={form.control}
            name="file"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Add Photos</FormLabel>
                    <FormControl>
                        <FileUploader/>
                    </FormControl>
                    <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="file"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Add Location</FormLabel>
                    <FormControl>
                        <Input 
                        type="text" 
                        className="shad-input"/>
                    </FormControl>
                    <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="tags"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Add Tags 
                        (Separate by " , ")</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            className="shad-input"
                            placeholder="Art,Expression, Learn"/>
                    </FormControl>
                    <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
        />
        <div className="flex gap-4 items-center justify-end">
             <Button type="button" className="shad-button_dark_4">
                Cancel
            </Button>

             <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit

             </Button>
        </div>
        </form>
    </Form>
  )
}

export default PostForm
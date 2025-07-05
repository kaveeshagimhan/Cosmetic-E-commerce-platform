import { createClient } from "@supabase/supabase-js";

const url ="https://vpsdqymflrxzgwyxnaog.supabase.co"
const key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwc2RxeW1mbHJ4emd3eXhuYW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTMzOTcsImV4cCI6MjA2NzI2OTM5N30.tUnz0ReFrwNK6KH-KH4baXLo0sgQSiAXfCH-yfop_9o"

const supabase =  createClient(url, key);

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject) => {
             if(file == null){
                reject("No file selected");
                return;
             }
             const timestamp = new Date().getTime();
             const newName = timestamp + file.name

             supabase.storage.from("images").upload(newName, file, {
                upsert: false,
                cacheControl: '3600'
             }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl;
                console.log(publicUrl);
                resolve(publicUrl);
             }).catch(
                (e)=>{
                    console.log(e);
                    reject("Error occured in supabase connection");
                }
             )
         
        }
    )
    return mediaUploadPromise
}
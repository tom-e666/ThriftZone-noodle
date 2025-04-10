'use client'
import {useRouter} from "next/router";
export default function page()
{
    const router= useRouter();
    const {user}=router.query;
    return (
        <div>
            {user}
        </div>
    )
}
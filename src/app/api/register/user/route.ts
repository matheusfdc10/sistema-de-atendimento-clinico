import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            password
        } = body

        return NextResponse.json(null);

        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            }
        })

        return NextResponse.json(user);
    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}















//  const [inputValue, setInputValue] = useState("");
//     const [selected, setSelected] = useState("");
//     const [open, setOpen] = useState(false);
  
//     return (
//       <div className="font-medium">
//         <label
//             className='
//                 block
//                 text-sm
//                 font-medium
//                 leading-6
//                 text-gray-900
//             '
//             htmlFor={id}
//         >
//             {label}
//         </label>
//         <div className='
//             mt-2
//             relative
//             flex
//         '>
//             <div
//                 id={id}
//                 disabled={disabled}
//                 {...register(id , { required , value: selected})}
//             onClick={() => setOpen(!open)}
//             className={clxs(`
//                 cursor-pointer
//                 outline-none
//                 block
//                 w-full
//                 rounded-md
//                 border-0
//                 py-1.5
//                 px-3
//                 text-neutral-900
//                 shadow-sm
//                 ring-1
//                 ring-inset
//                 ring-neutral-300
//                 placeholder:text-neutral-400
//                 focus:ring-2
//                 focus:ring-inset
//                 sm:text-sm
//                 sm:leading-6
//                 bg-white`,
//                 errors[id] ? 'ring-rose-500 ring-2' : 'focus:ring-sky-600',
//                 disabled && 'bg-neutral-50 cursor-default'
//             )}
//             >
//             {selected
//                 ? selected?.length > 25
//                 ? selected?.substring(0, 25) + "..."
//                 : selected
//                 : "Select Country"}
//             {/* <BiChevronDown size={20} className={`${open && "rotate-180"}`} /> */}
//             </div>
//             <ul
//             className={`bg-white mt-9 overflow-y-auto absolute ${
//                 open ? "max-h-60" : "max-h-0"
//             } `}
//             >
//             <div className="flex items-center px-2 sticky top-0 bg-white">
//                 {/* <AiOutlineSearch size={18} className="text-gray-700" /> */}
//                 <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value.toLowerCase())}
//                 placeholder="Enter country name"
//                 className="placeholder:text-gray-700 p-2 outline-none"
//                 />
//             </div>
//             {options?.map((country) => (
//                 <li
//                 key={country}
//                 className={`p-2 text-sm hover:bg-sky-600 hover:text-white
//                 ${
//                     country?.toLowerCase() === selected?.toLowerCase() &&
//                     "bg-sky-600 text-white"
//                 }
//                 ${
//                     country?.toLowerCase().startsWith(inputValue)
//                     ? "block"
//                     : "hidden"
//                 }`}
//                 onClick={() => {
//                     if (country?.toLowerCase() !== selected.toLowerCase()) {
//                     setSelected(country);
//                     setOpen(false);
//                     setInputValue("");
//                     }
//                 }}
//                 >
//                 {country}
//                 </li>
//             ))}
//             </ul>
//         </div>
//       </div>
//     );
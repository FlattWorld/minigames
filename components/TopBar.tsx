
import ThemeSelector from "@/components/ThemeSelector";
import { QuestionMarkCircleIcon, ChartBarSquareIcon } from "@heroicons/react/24/outline";

const TopBar = ({setIsInfo, setIsModalVisible}:{setIsInfo: Function; setIsModalVisible: Function}) => (
<div className="max-w-2xl w-full flex justify-between items-center rounded-xl bg-gray-200 px-8 py-4 my-8 dark:bg-[#DADCE0] dark:bg-opacity-5">
<QuestionMarkCircleIcon onClick={() => {
  setIsInfo(true)
  setIsModalVisible(true)
}} className="2-6 h-6 cursor-pointer" />
<h1 className="text-3xl font-bold">Wordle</h1>
<div className="flex items-center gap-4"> <ChartBarSquareIcon onClick={() =>setIsModalVisible(true) } className="cursor-pointer 2-6 h-6" />
  <ThemeSelector />
</div>
</div>)

export default TopBar
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/card/Card";

export const DogList = ({}: { list: string[] }) => {
  return (
    <div className="space-y-3">
      {/* {list.map((dog) => ( */}
      <Card className="overflow-hidden hover:bg-gray-50 transition-colors">
        <CardContent className="flex items-center p-3 sm:p-4">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cover bg-center mr-3 sm:mr-4 flex-shrink-0"
            style={{
              backgroundImage: `url(https://api.thedogapi.com/v1/images/search?size=small&mime_types=jpg&format=src&has_breeds=true&order=RANDOM&page=0&limit=1)`,
            }}
          />
          <div className="min-w-0 text-black">
            <CardTitle className="font-semibold text-sm sm:text-base truncate">
              Bengal
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-500 truncate">
              Food
            </CardDescription>
          </div>
        </CardContent>
      </Card>
      {/* ))} */}
    </div>
  );
};

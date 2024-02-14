import { useGetCharactersMutation } from "../../../api/divasApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCharacters } from "../../app/slice";

const CharacterSelect = () => {
  const [getCharacters] = useGetCharactersMutation();
  let [characters, setCharacters] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const characters = await getCharacters();
      setCharacters(characters.data);
      dispatch(updateCharacters(characters.data));
    };

    fetchData().catch(console.error);
  }, []);

  function createCharacters() {
    const rows = [];
    for (const char of characters) {
      rows.push(
        <Link
          key={char.id}
          to={`/gameplay/${char.id}`}
          className="flex flex-col hover:bg-indigo-800 rounded-md p-5"
        >
          <img
            src="https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png"
            width={200}
          />
          <p className="text-white text-2xl">{char.name}</p>
        </Link>
      );
    }
    return rows;
  }

  return (
    <>
      <h1 className="text-white text-4xl mt-5">Select your Character</h1>
      <div className="flex flex-wrap gap-5 justify-center items-center mb-auto h-[70vh]">
        {characters && characters.length > 0 && createCharacters()}
      </div>
    </>
  );
};

export default CharacterSelect;

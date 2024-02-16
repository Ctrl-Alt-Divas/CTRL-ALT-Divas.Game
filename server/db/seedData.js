const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS player;
      DROP TABLE IF EXISTS character;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Building All Tables...");
    await client.query(`
      CREATE TABLE player (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        score INTEGER,
        image VARCHAR(255)
        );
      CREATE TABLE character (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        shrtdescription TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        speed INTEGER NOT NULL,
        jump INTEGER NOT NULL
        );
        `);
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log("Creating Initial Data...");
    await client.query(`
      INSERT INTO character (name, description, shrtdescription, image, speed, jump)
      VALUES
        ('Lani', 'In the vibrant digital realm of CTRL-ALT-Divas, meet Lani, a non-binary powerhouse whose dynamic personality and goth style set them apart in the gaming universe. With a striking blend of strength and wisdom, Lani navigates the virtual landscape with a fierce sense of individuality. Their pronouns, they/she, reflect the multifaceted nature of their character.

        Lani is more than just a gamer; they are a neo-spiritual force, driven by a strong set of opinions and a passion for art, music, and the transformative power of software development. Whether immersed in the creation of visually stunning interfaces or curating immersive digital experiences, Lani is on a mission to beautify the user experience.
        
        What truly sets Lani apart is their extraordinary superpower – clairsentience, a psychic intuition that allows them to perceive and understand the emotions and energies around them. Harnessing this mystical ability, Lani takes down enemies with finesse, using amethyst geodes as powerful projectiles. These crystalline projectiles not only showcase Lani''s connection to the spiritual realm but also add a touch of elegance to their arsenal.
        
        In the CTRL-ALT-Divas universe, Lani stands as a symbol of empowerment, embracing their non-binary identity while breaking barriers with a combination of technical prowess, artistic flair, and a dash of supernatural intuition. As players embark on adventures with Lani, they''ll witness a character that challenges stereotypes, celebrates diversity, and, above all, demonstrates that strength and beauty can coexist in a virtual world.', 'Meet Lani, a non-binary powerhouse', 'lani.png', -1.5, 15),

        ('Eli', 'Introducing Eli, a Mexican-American woman with a courageous spirit and a background as a former Marine. Having served her country with honor, Eli now embarks on an bold adventure into the realm of web development. In this immersive game, players join Eli on her journey as she navigates the intricacies of coding, design, and problem-solving to master the art of web development. With her military training as a foundation, Eli approaches each challenge with discipline, resilience, and a thirst for knowledge. As players guide her through the game, they''ll witness Eli''s transformation from a skilled Marine to a formidable web developer, proving that with determination and adaptability, one can conquer any battlefield, digital or otherwise. ','Meet Eli, a Mexican-American woman with a courageous spirit', 'eli.png', -1.5, 15),

        ('Lily Pad', 'Meet Lilypad, a formidable feminist protagonist in the CRTL ALT DIVAS video game world. Hailing from Mexico, Lilypad embodies strength, resilience, and a passion for equality. As a bilingual powerhouse fluent in both Spanish and English, she navigates the realms of software development with unparalleled determination.

        Her unique ability lies in conquering the digital landscape, one coding program at a time. With each new skill she acquires, Lilypad gains mastery over the virtual world, unlocking its secrets and bending it to her will.
        
        Though her jumps may lack height, Lilypad compensates with lightning-fast agility, darting through obstacles with ease. But don''t underestimate her – her fiery spirit manifests in her ability to hurl scorching fireballs at adversaries, turning the tide of battle in her favor.
        
        Lilypad isn''t just a character; she''s an inspiration, challenging stereotypes and breaking barriers as she paves her way to victory in both the virtual and real worlds.','Meet Lilypad, a formidable feminist protagonist', 'lilypad.png', -4, 10),

        ('Fancypants', 'Fancypants is a captivating video game character, a determined redhead with a heart as sweet as her demeanor. Despite her shy nature, Fancypants harbors an unwavering passion for coding, driven by an unrelenting ambition to become the best developer in the realm. Clad in distinctive, stylish attire that reflects her unique personality, Fancypants navigates the digital world with a quiet confidence, overcoming challenges and mastering coding languages with finesse. Her journey unfolds as she tackles obstacles, demonstrating that beneath her demure exterior lies an unstoppable force fueled by a love for programming and an unwavering dedication to achieving greatness in the coding realm.  She kills her enemies with kindness, by throwing hearts at them.','Meet Fancypants, a determined redhead with a heart as sweet as her demeanor', 'avatar.png', -1.5, 15)
        `);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};

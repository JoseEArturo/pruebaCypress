describe("Interceptando network requests", () => {
  it("Repaso de request", () => {
    cy.request("https://pokeapi.co/api/v2/pokemon/ditto").then((response) => {
      expect(response.body).to.have.property("name", "ditto");
      expect(response.status).to.eq(200);
      cy.log(response.body);
    });
  });

  it("Prueba de un intercept simple", () => {
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon-species/1").as(
      "bulbasaur"
    );
    cy.visit("https://pokedexpokemon.netlify.app/");
    cy.contains("Bulbasaur")
      .parent()
      .parent()
      .within((element) => {
        cy.wrap(element).contains("Más detalles").click();
      });

    // cy.wait("@bulbasaur").then(interception=>{
    //     cy.log(interception)
    //     expect(interception.response.body).to.have.property("name", "bulbasaur");
    //     expect(interception.response.statusCode).to.eq(200);
    // })

    // cy.wait("@bulbasaur",{timeout: 20000})

    cy.wait("@bulbasaur").its("response.statusCode").should("eq", 200);

    // cy.intercept(
    //   { method: "POST", url: "https://api.stripe.com/v1/charges" },
    //   { success: true }
    // );
  });

  it('Probar intercept y forzarlo a que falle', () => {

    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon-species/1",{
      forceNetworkError: true,
    }).as("error");
    cy.visit("https://pokedexpokemon.netlify.app/");
    cy.contains("Bulbasaur")
      .parent()
      .parent()
      .within((element) => {
        cy.wrap(element).contains("Más detalles").click();
      });
    cy.wait("@error").should("have.property","error")
  });

  it.only('Prueba intercept cambiando el body', () => {
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon-species/25",{
      statusCode: 200,
      body: {
          "base_happiness": 50,
          "capture_rate": 190,
          "color": {
          "name": "yellow",
          "url": "https://pokeapi.co/api/v2/pokemon-color/10/"
          },
          "egg_groups": [
          {
          "name": "ground",
          "url": "https://pokeapi.co/api/v2/egg-group/5/"
          },
          {
          "name": "fairy",
          "url": "https://pokeapi.co/api/v2/egg-group/6/"
          }
          ],
          "evolution_chain": {
          "url": "https://pokeapi.co/api/v2/evolution-chain/10/"
          },
          "evolves_from_species": {
          "name": "pichu",
          "url": "https://pokeapi.co/api/v2/pokemon-species/172/"
          },
          "flavor_text_entries": [
          {
          "flavor_text": "When several of these POKéMON gather, theirelectricity could build and cause lightning storms.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "red",
          "url": "https://pokeapi.co/api/v2/version/1/"
          }
          },
          {
          "flavor_text": "When several of these POKéMON gather, theirelectricity could build and cause lightning storms.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "blue",
          "url": "https://pokeapi.co/api/v2/version/2/"
          }
          },
          {
          "flavor_text": "It keeps its tail raised to monitor its surroundings.If you yank its tail, it will try to bite you.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "yellow",
          "url": "https://pokeapi.co/api/v2/version/3/"
          }
          },
          {
          "flavor_text": "This intelligent POKéMON roasts hard BERRIES withelectricity to make them tender enough to eat.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "gold",
          "url": "https://pokeapi.co/api/v2/version/4/"
          }
          },
          {
          "flavor_text": "It raises its tail to check its sur­ roundings. Thetail is sometimes struck by light­ ning in this pose.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "silver",
          "url": "https://pokeapi.co/api/v2/version/5/"
          }
          },
          {
          "flavor_text": "When it is anger­ ed, it immediately discharges theenergy stored in the pouches in its cheeks.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "crystal",
          "url": "https://pokeapi.co/api/v2/version/6/"
          }
          },
          {
          "flavor_text": "Whenever PIKACHU comes across something new, it blasts it with a jolt of electricity.If you come across a blackened berry, it’s evidence that this POKéMON mistook the intensity of its charge.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "ruby",
          "url": "https://pokeapi.co/api/v2/version/7/"
          }
          },
          {
          "flavor_text": "This POKéMON has electricity-storing pouches on its cheeks. These appear to become electrically charged during thenight while PIKACHU sleeps. It occasionally discharges electricity when it is dozy after waking up.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "sapphire",
          "url": "https://pokeapi.co/api/v2/version/8/"
          }
          },
          {
          "flavor_text": "It stores electricity in the electric sacs on its cheeks. When it releases pent-up energy in a burst, the electric power is equal to a lightning bolt.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "emerald",
          "url": "https://pokeapi.co/api/v2/version/9/"
          }
          },
          {
          "flavor_text": "It has small electric sacs on both its cheeks. If threatened, it looses electric charges from the sacs.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "firered",
          "url": "https://pokeapi.co/api/v2/version/10/"
          }
          },
          {
          "flavor_text": "When several of these POKéMON gather, their electricity can build and cause lightning storms.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "leafgreen",
          "url": "https://pokeapi.co/api/v2/version/11/"
          }
          },
          {
          "flavor_text": "It lives in forests with others. It stores electricity in the pouches on its cheeks.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "diamond",
          "url": "https://pokeapi.co/api/v2/version/12/"
          }
          },
          {
          "flavor_text": "If it looses crackling power from the electric pouches on its cheeks, it is being wary.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "pearl",
          "url": "https://pokeapi.co/api/v2/version/13/"
          }
          },
          {
          "flavor_text": "It occasionally uses an electric shock to recharge a fellow PIKACHU that is in a weakened state.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "platinum",
          "url": "https://pokeapi.co/api/v2/version/14/"
          }
          },
          {
          "flavor_text": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "heartgold",
          "url": "https://pokeapi.co/api/v2/version/15/"
          }
          },
          {
          "flavor_text": "It raises its tail to check its surroundings. The tail is sometimes struck by lightning in this pose.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "soulsilver",
          "url": "https://pokeapi.co/api/v2/version/16/"
          }
          },
          {
          "flavor_text": "Il lui arrive de remettre d’aplomb un Pikachu allié en lui envoyant une décharge électrique.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "black",
          "url": "https://pokeapi.co/api/v2/version/17/"
          }
          },
          {
          "flavor_text": "It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "black",
          "url": "https://pokeapi.co/api/v2/version/17/"
          }
          },
          {
          "flavor_text": "Il lui arrive de remettre d’aplomb un Pikachu allié en lui envoyant une décharge électrique.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "white",
          "url": "https://pokeapi.co/api/v2/version/18/"
          }
          },
          {
          "flavor_text": "It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "white",
          "url": "https://pokeapi.co/api/v2/version/18/"
          }
          },
          {
          "flavor_text": "It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "black-2",
          "url": "https://pokeapi.co/api/v2/version/21/"
          }
          },
          {
          "flavor_text": "It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "white-2",
          "url": "https://pokeapi.co/api/v2/version/22/"
          }
          },
          {
          "flavor_text": "しっぽを　たてて　まわりの ようすを　さぐっていると　ときどき かみなりが　しっぽに　おちてくる。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "꼬리를 세우고 주변의 상황을 살피다 보면 가끔 꼬리에 번개가 친다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "Il élève sa queue pour surveiller les environs. Elle attire souvent la foudre dans cette position.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "Es streckt seinen Schweif nach oben, um seine Umgebung zu prüfen. Häufig fährt ein Blitz hinein.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "Levanta su cola para vigilar los alrededores. A veces, puede ser alcanzado por un rayo en esa pose.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "Solleva la coda per esaminare l’ambiente circostante. A volte la coda è colpita da un fulmine quando è in questa posizione.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "It raises its tail to check its surroundings. The tail is sometimes struck by lightning in this pose.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "尻尾を　立てて　まわりの　様子を 探っていると　ときどき 雷が　尻尾に　落ちてくる。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "x",
          "url": "https://pokeapi.co/api/v2/version/23/"
          }
          },
          {
          "flavor_text": "ほっぺたの　りょうがわに ちいさい　でんきぶくろを　もつ。 ピンチのときに　ほうでんする。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "뺨의 양쪽에 작은 전기 주머니가 있다. 위기 상황일 때 방전한다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "Pikachu a de petites poches pleines d’électricité sur ses joues. S’il se sent menacé, il laisse s’échapper des décharges électriques.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "Es hat kleine Backentaschen, die mit Elektrizität gefüllt sind. Bei Gefahr entlädt es sie.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "Las bolsas de las mejillas están llenas de electricidad, que libera cuando se siente amenazado.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "Se spaventato, perde scariche elettriche dalle due sacche che ha sulle guance.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "It has small electric sacs on both its cheeks. If threatened, it looses electric charges from the sacs.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "ほっぺたの　両側に 小さい　電気袋を　持つ。 ピンチのときに　放電する。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "y",
          "url": "https://pokeapi.co/api/v2/version/24/"
          }
          },
          {
          "flavor_text": "はじめて　みる　ものには　でんげきを　あてる。 くろこげの　きのみが　おちていたら　それは でんげきの　つよさを　まちがえた　しょうこだよ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "처음 보는 것에게는 전격을 맞춘다. 새까맣게 탄 나무열매가 떨어져 있다는 것은 전격의 세기를 조절하지 못했다는 증거다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "Chaque fois que Pikachu découvre quelque chose de nouveau, il envoie un arc électrique. Lorsqu’on tombe sur une Baie carbonisée, ça signifie sans doute qu’un de ces Pokémon a envoyé une charge trop forte.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "Immer wenn Pikachu auf etwas Neues stößt, jagt es einen Elektroschock hindurch. Wenn du eine verkohlte Beere findest, hat dieses Pokémon seine elektrische Ladung falsch eingeschätzt.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "Cada vez que un Pikachu se encuentra con algo nuevo, le lanza una descarga eléctrica. Cuando se ve alguna baya chamuscada, es muy probable que sea obra de un Pikachu, ya que a veces no controlan la intensidad de la descarga.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "Quando Pikachu incontra qualcosa che non conosce, lo colpisce con una scarica elettrica. Quando si vede una bacca annerita, è evidente che questo Pokémon ha emesso una scossa troppo forte.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it’s evidence that this Pokémon mistook the intensity of its charge.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "はじめて　みる　ものには　電撃を　当てる。 黒こげの　きのみが　落ちていたら　それは 電撃の　強さを　間違えた　証拠だよ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "omega-ruby",
          "url": "https://pokeapi.co/api/v2/version/25/"
          }
          },
          {
          "flavor_text": "ほっぺの　でんきぶくろの　でんきは　まよなか ねている　あいだに　ためられている　らしいよ。 ねぼけて　ほうでんしてしまう　ことが　ある。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "뺨의 전기 주머니에 있는 전기는 한밤중 자는 동안 축적되는 것 같다. 잠이 덜 깨서 방전하기도 한다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "Ce Pokémon dispose de petites poches dans les joues pour stocker de l’électricité. Elles semblent se charger pendant que Pikachu dort. Il libère parfois un peu d’électricité lorsqu’il n’est pas encore bien réveillé.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "Dieses Pokémon kann in seinen Backentaschen Elektrizität speichern. Diese laden sich nachts auf, während Pikachu schläft. Es entlädt manchmal seine elektrische Ladung, wenn es gerade aufgewacht und noch schläfrig ist.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "Este Pokémon tiene unas bolsas en las mejillas donde almacena electricidad. Parece ser que se recargan por la noche, mientras Pikachu duerme. A veces, cuando se acaba de despertar y está aún medio dormido, descarga un poco.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "Pikachu immagazzina l’elettricità nelle guance. Pare che queste si ricarichino durante la notte quando dorme. Talvolta emette delle scariche elettriche al risveglio mentre è ancora assonnato.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "This Pokémon has electricity-storing pouches on its cheeks. These appear to become electrically charged during the night while Pikachu sleeps. It occasionally discharges electricity when it is dozy after waking up.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "ほっぺの　電気袋の　電気は　真夜中 寝ている　間に　ためられている　らしいよ。 寝ぼけて　放電してしまう　ことが　ある。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "alpha-sapphire",
          "url": "https://pokeapi.co/api/v2/version/26/"
          }
          },
          {
          "flavor_text": "たくさんの　ピカチュウを　あつめ はつでんしょを　つくる　けいかくが さいきん　はっぴょう　された。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "많은 피카츄를 모아서 발전소를 만들 계획이 최근 발표되었다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "最近發表了聚集大量皮卡丘 來建造發電廠的計畫。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "Un projet de centrale électrique fonctionnant en rassemblant une foule de Pikachu a été récemment annoncé.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "Vor Kurzem wurden Pläne verkündet, mithilfe einer großen Anzahl an Pikachu ein ganzes Kraftwerk zu betreiben.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "Recientemente se ha presentado un proyecto para reunir numerosos Pikachu y crear con ellos una central eléctrica.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "Recentemente è stato presentato un progetto per riunire numerosi Pikachu e costruire una centrale elettrica.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "A plan was recently announced to gather many Pikachu and make an electric power plant.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "たくさんの　ピカチュウを　集め 発電所を　造る　計画が 最近　発表　された。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "最近发表了聚集大量皮卡丘， 建造发电厂的计划。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "sun",
          "url": "https://pokeapi.co/api/v2/version/27/"
          }
          },
          {
          "flavor_text": "でんきを　ためる　せいしつ。 ときどき　おもいきり　ほうでん しないと　ストレスを　かんじる。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "전기를 모으는 성질을 가졌다. 가끔 마음껏 방전하지 않으면 스트레스를 받는다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "有積聚電力的特質。 不時常盡情釋放電力的話， 就會倍感壓力。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "Un Pokémon capable de condenser l’électricité. Il doit décharger l’énergie accumulée de temps en temps au risque d’accroître son stress.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "Es liegt in seiner Natur, konstant Elektrizität in sich anzustauen. Kann es diese nicht regelmäßig entladen, löst dies Stress aus.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "Pikachu almacena electricidad en su cuerpo. Si no la libera de vez en cuando y se desfoga, puede sufrir estrés.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "Accumula naturalmente elettricità. Se ogni tanto non si sfoga emettendo scariche elettriche, rischia di essere sopraffatto dallo stress.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "It’s in its nature to store electricity. It feels stressed now and then if it’s unable to fully discharge the electricity.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "電気を　溜める　性質。 時々　思い切り　放電 しないと　ストレスを　感じる。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "有积聚电力的特质。 不时常尽情释放电力的话， 就会倍感压力。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "moon",
          "url": "https://pokeapi.co/api/v2/version/28/"
          }
          },
          {
          "flavor_text": "でんきを　ためこむ　せいしつ。 ピカチュウが　むれて　くらす　もりは らくらいが　たえず　キケンだ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "전기를 모으는 성질을 띠고 있다. 피카츄가 무리 지어 사는 숲은 낙뢰가 끊이지 않아 위험하다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "擁有儲蓄電力的特性。 皮卡丘群居的森林裡 會不斷落雷，十分危險。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "Son corps peut accumuler de l’électricité. Les forêts abritant des groupes de Pikachu sont d’ailleurs souvent frappées par la foudre.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "Es liegt in seiner Natur, konstant Elektrizität zu speichern. Die Wälder, in denen Pikachu leben, bergen stets die Gefahr eines Blitzgewitters.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "Acumulan electricidad de forma natural. Los bosques donde habitan en grupos están en peligro constante de ser alcanzados por rayos.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "Accumula naturalmente elettricità. I boschi popolati da gruppi di Pikachu sono pericolosi perché continuamente colpiti dai fulmini.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "Its nature is to store up electricity. Forests where nests of Pikachu live are dangerous, since the trees are so often struck by lightning.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "電気を　ため込む　性質。 ピカチュウが　群れて　暮らす　森は 落雷が　絶えず　危険だ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "有积存电力的特质。 在皮卡丘群居的森林里 会落雷不断，十分危险。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "ultra-sun",
          "url": "https://pokeapi.co/api/v2/version/29/"
          }
          },
          {
          "flavor_text": "ねてる　あいだに　ほっぺの　ふくろで でんきを　つくる。　ねぶそく　だと よわい　でんきしか　だせなくなるぞ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "자는 동안 볼의 주머니에서 전기를 만든다. 잠이 부족하면 약한 전기밖에 낼 수 없게 된다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "會在睡覺時用臉頰上的囊 製造電力。如果睡眠不足， 就只能放出微弱的電力。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "Quand il dort, il génère de l’électricité dans les poches de ses joues. S’il manque de sommeil, il ne peut plus émettre qu’un faible courant.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "Seine Backentaschen laden sich elektrisch auf, während es schläft. Bei Schlafmangel kann es nur Schwachstrom entladen.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "Mientras duerme, acumula electricidad en las bolsas de sus mejillas. Si no logra conciliar el sueño, solo puede emitir débiles descargas.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "Mentre dorme produce energia elettrica nelle sacche che ha sulle guance. Se non riposa abbastanza può emettere solo deboli scariche.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "While sleeping, it generates electricity in the sacs in its cheeks. If it’s not getting enough sleep, it will be able to use only weak electricity.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "寝てる　間に　ほっぺの　袋で 電気を　作る。　寝不足　だと 弱い　電気しか　出せなくなるぞ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "会在睡着时用脸颊上的袋子 制造电力。如果睡眠不足， 就只能放出微弱的电力。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "ultra-moon",
          "url": "https://pokeapi.co/api/v2/version/30/"
          }
          },
          {
          "flavor_text": "もりに　すむ　ポケモン。　ほっぺの ふくろは　でんきを　ためるので さわると　パチパチ　しびれるぞ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "숲에 사는 포켓몬. 볼에 있는 주머니에 전기를 모으고 있어 만지면 저릿저릿 저리다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "棲息在森林裡的寶可夢。 臉頰上的囊能夠儲存電力， 用手去摸會被電得麻麻的。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "Ce Pokémon des bois accumule de l’électricité dans les poches de ses joues. Il ne faut pas les toucher sous peine de recevoir une décharge.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "Pikachu ist in Wäldern zu Hause. Da es in seinen Backentaschen Elektrizität speichert, bekommt man einen Schlag, wenn man diese berührt.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "Los bosques son su hábitat natural. En las bolsas de las mejillas acumula electricidad, por lo que quien las toque puede recibir una descarga.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "Vive nelle foreste. Accumula elettricità nelle sacche sulle guance, e chiunque le tocchi prende la scossa.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "This forest-dwelling Pokémon stores electricity in its cheeks, so you’ll feel a tingly shock if you touch it.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "森に　棲む　ポケモン。　ほっぺの ふくろは　電気を　ためるので 触ると　パチパチ　痺れるぞ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "栖息在森林中的宝可梦。由于 它脸颊上的袋子中储存了电能， 触摸了之后会觉得麻麻的。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "lets-go-pikachu",
          "url": "https://pokeapi.co/api/v2/version/31/"
          }
          },
          {
          "flavor_text": "もりに　すむ　ポケモン。　ほっぺの ふくろは　でんきを　ためるので さわると　パチパチ　しびれるぞ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "숲에 사는 포켓몬. 볼에 있는 주머니에 전기를 모으고 있어 만지면 저릿저릿 저리다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "棲息在森林裡的寶可夢。 臉頰上的囊能夠儲存電力， 用手去摸會被電得麻麻的。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "Ce Pokémon des bois accumule de l’électricité dans les poches de ses joues. Il ne faut pas les toucher sous peine de recevoir une décharge.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "Pikachu ist in Wäldern zu Hause. Da es in seinen Backentaschen Elektrizität speichert, bekommt man einen Schlag, wenn man diese berührt.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "Los bosques son su hábitat natural. En las bolsas de las mejillas acumula electricidad, por lo que quien las toque puede recibir una descarga.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "Vive nelle foreste. Accumula elettricità nelle sacche sulle guance, e chiunque le tocchi prende la scossa.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "This forest-dwelling Pokémon stores electricity in its cheeks, so you’ll feel a tingly shock if you touch it.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "森に　棲む　ポケモン。　ほっぺの ふくろは　電気を　ためるので 触ると　パチパチ　痺れるぞ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "栖息在森林中的宝可梦。由于 它脸颊上的袋子中储存了电能， 触摸了之后会觉得麻麻的。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "lets-go-eevee",
          "url": "https://pokeapi.co/api/v2/version/32/"
          }
          },
          {
          "flavor_text": "つくる　でんきが　きょうりょくな ピカチュウほど　ほっぺの　ふくろは やわらかく　よく　のびるぞ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "만들어 내는 전기가 강력한 피카츄일수록 볼의 주머니가 부드럽고 잘 늘어난다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "越是能製造出強大電流的 皮卡丘，臉頰上的囊就越 柔軟，同時也越有伸展性。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "Plus la puissance électrique de Pikachu est élevée, plus les poches de ses joues sont extensibles.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "Je stärker die Elektrizität ist, die Pikachu produziert, desto weicher und elastischer sind seine Backentaschen.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "Cuanto más potente es la energía eléctrica que genera este Pokémon, más suaves y elásticas se vuelven las bolsas de sus mejillas.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "Più potente è l’energia elettrica prodotta dal Pokémon, più le sacche sulle sue guance sono morbide ed elastiche.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "つくる　電気が　強力な ピカチュウほど　ほっぺの　袋は 軟らかく　よく　伸びるぞ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "越是能制造出强大电流的 皮卡丘，脸颊上的囊就越 柔软，同时也越有伸展性。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "sword",
          "url": "https://pokeapi.co/api/v2/version/33/"
          }
          },
          {
          "flavor_text": "おたがいの　しっぽを　くっつけて でんきを　ながしあうのが ピカチュウ　どうしの　あいさつだ。",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "서로의 꼬리를 붙여서 전기를 흐르게 하는 게 피카츄 사이의 인사법이다.",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "皮卡丘們把尾巴 貼在一起交換電流， 其實是在互相打招呼。",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "Les Pikachu se disent bonjour en se frottant la queue et en y faisant passer du courant électrique.",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "Pikachu begrüßen einander, indem sie ihre Schweife aneinanderreiben und eine Ladung Strom durch diese gleiten lassen.",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "Los miembros de esta especie se saludan entre sí uniendo sus colas y transmitiéndose corriente eléctrica.",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "I Pikachu si salutano fra loro unendo le code e facendovi passare elettricità attraverso.",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "When Pikachu meet, they’ll touch their tails together and exchange electricity through them as a form of greeting.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "おたがいの　しっぽを　くっつけて 電気を　流しあうのが ピカチュウ　同士の　挨拶だ。",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "皮卡丘们把尾巴 贴在一起交换电流， 其实是在互相打招呼。",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "version": {
          "name": "shield",
          "url": "https://pokeapi.co/api/v2/version/34/"
          }
          },
          {
          "flavor_text": "Possesses cheek sacs in which it stores electricity. This clever forest-dweller roasts tough berries with an electric shock before consuming them.",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "version": {
          "name": "legends-arceus",
          "url": "https://pokeapi.co/api/v2/version/39/"
          }
          }
          ],
          "form_descriptions": [],
          "forms_switchable": false,
          "gender_rate": 4,
          "genera": [
          {
          "genus": "ねずみポケモン",
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          }
          },
          {
          "genus": "쥐포켓몬",
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          }
          },
          {
          "genus": "鼠寶可夢",
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          }
          },
          {
          "genus": "Pokémon Souris",
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          }
          },
          {
          "genus": "Maus-Pokémon",
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          }
          },
          {
          "genus": "Pokémon Ratón",
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          }
          },
          {
          "genus": "Pokémon Topo",
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          }
          },
          {
          "genus": "Mouse Pokémon",
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          }
          },
          {
          "genus": "ねずみポケモン",
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          }
          },
          {
          "genus": "鼠宝可梦",
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          }
          }
          ],
          "generation": {
          "name": "generation-i",
          "url": "https://pokeapi.co/api/v2/generation/1/"
          },
          "growth_rate": {
          "name": "medium",
          "url": "https://pokeapi.co/api/v2/growth-rate/2/"
          },
          "habitat": {
          "name": "forest",
          "url": "https://pokeapi.co/api/v2/pokemon-habitat/2/"
          },
          "has_gender_differences": true,
          "hatch_counter": 10,
          "id": 25,
          "is_baby": false,
          "is_legendary": false,
          "is_mythical": false,
          "name": "pikachu",
          "names": [
          {
          "language": {
          "name": "ja-Hrkt",
          "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "name": "ピカチュウ"
          },
          {
          "language": {
          "name": "roomaji",
          "url": "https://pokeapi.co/api/v2/language/2/"
          },
          "name": "Pikachu"
          },
          {
          "language": {
          "name": "ko",
          "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "name": "피카츄"
          },
          {
          "language": {
          "name": "zh-Hant",
          "url": "https://pokeapi.co/api/v2/language/4/"
          },
          "name": "皮卡丘"
          },
          {
          "language": {
          "name": "fr",
          "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "name": "Pikachu"
          },
          {
          "language": {
          "name": "de",
          "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "name": "Pikachu"
          },
          {
          "language": {
          "name": "es",
          "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "name": "Pikachu"
          },
          {
          "language": {
          "name": "it",
          "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "name": "Pikachu"
          },
          {
          "language": {
          "name": "en",
          "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "name": "Pikachu"
          },
          {
          "language": {
          "name": "ja",
          "url": "https://pokeapi.co/api/v2/language/11/"
          },
          "name": "ピカチュウ"
          },
          {
          "language": {
          "name": "zh-Hans",
          "url": "https://pokeapi.co/api/v2/language/12/"
          },
          "name": "皮卡丘"
          }
          ],
          "order": 26,
          "pal_park_encounters": [
          {
          "area": {
          "name": "forest",
          "url": "https://pokeapi.co/api/v2/pal-park-area/1/"
          },
          "base_score": 80,
          "rate": 10
          }
          ],
          "pokedex_numbers": [
          {
          "entry_number": 25,
          "pokedex": {
          "name": "national",
          "url": "https://pokeapi.co/api/v2/pokedex/1/"
          }
          },
          {
          "entry_number": 25,
          "pokedex": {
          "name": "kanto",
          "url": "https://pokeapi.co/api/v2/pokedex/2/"
          }
          },
          {
          "entry_number": 22,
          "pokedex": {
          "name": "original-johto",
          "url": "https://pokeapi.co/api/v2/pokedex/3/"
          }
          },
          {
          "entry_number": 156,
          "pokedex": {
          "name": "hoenn",
          "url": "https://pokeapi.co/api/v2/pokedex/4/"
          }
          },
          {
          "entry_number": 104,
          "pokedex": {
          "name": "original-sinnoh",
          "url": "https://pokeapi.co/api/v2/pokedex/5/"
          }
          },
          {
          "entry_number": 104,
          "pokedex": {
          "name": "extended-sinnoh",
          "url": "https://pokeapi.co/api/v2/pokedex/6/"
          }
          },
          {
          "entry_number": 22,
          "pokedex": {
          "name": "updated-johto",
          "url": "https://pokeapi.co/api/v2/pokedex/7/"
          }
          },
          {
          "entry_number": 16,
          "pokedex": {
          "name": "conquest-gallery",
          "url": "https://pokeapi.co/api/v2/pokedex/11/"
          }
          },
          {
          "entry_number": 36,
          "pokedex": {
          "name": "kalos-central",
          "url": "https://pokeapi.co/api/v2/pokedex/12/"
          }
          },
          {
          "entry_number": 163,
          "pokedex": {
          "name": "updated-hoenn",
          "url": "https://pokeapi.co/api/v2/pokedex/15/"
          }
          },
          {
          "entry_number": 25,
          "pokedex": {
          "name": "original-alola",
          "url": "https://pokeapi.co/api/v2/pokedex/16/"
          }
          },
          {
          "entry_number": 25,
          "pokedex": {
          "name": "original-melemele",
          "url": "https://pokeapi.co/api/v2/pokedex/17/"
          }
          },
          {
          "entry_number": 32,
          "pokedex": {
          "name": "updated-alola",
          "url": "https://pokeapi.co/api/v2/pokedex/21/"
          }
          },
          {
          "entry_number": 32,
          "pokedex": {
          "name": "updated-melemele",
          "url": "https://pokeapi.co/api/v2/pokedex/22/"
          }
          },
          {
          "entry_number": 25,
          "pokedex": {
          "name": "letsgo-kanto",
          "url": "https://pokeapi.co/api/v2/pokedex/26/"
          }
          },
          {
          "entry_number": 194,
          "pokedex": {
          "name": "galar",
          "url": "https://pokeapi.co/api/v2/pokedex/27/"
          }
          },
          {
          "entry_number": 85,
          "pokedex": {
          "name": "isle-of-armor",
          "url": "https://pokeapi.co/api/v2/pokedex/28/"
          }
          },
          {
          "entry_number": 56,
          "pokedex": {
          "name": "hisui",
          "url": "https://pokeapi.co/api/v2/pokedex/30/"
          }
          },
          {
          "entry_number": 74,
          "pokedex": {
          "name": "paldea",
          "url": "https://pokeapi.co/api/v2/pokedex/31/"
          }
          }
          ],
          "shape": {
          "name": "quadruped",
          "url": "https://pokeapi.co/api/v2/pokemon-shape/8/"
          },
          "varieties": [
          {
          "is_default": true,
          "pokemon": {
          "name": "pikachu",
          "url": "https://pokeapi.co/api/v2/pokemon/25/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-rock-star",
          "url": "https://pokeapi.co/api/v2/pokemon/10080/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-belle",
          "url": "https://pokeapi.co/api/v2/pokemon/10081/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-pop-star",
          "url": "https://pokeapi.co/api/v2/pokemon/10082/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-phd",
          "url": "https://pokeapi.co/api/v2/pokemon/10083/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-libre",
          "url": "https://pokeapi.co/api/v2/pokemon/10084/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-cosplay",
          "url": "https://pokeapi.co/api/v2/pokemon/10085/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-original-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10094/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-hoenn-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10095/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-sinnoh-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10096/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-unova-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10097/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-kalos-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10098/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-alola-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10099/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-partner-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10148/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-starter",
          "url": "https://pokeapi.co/api/v2/pokemon/10158/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-world-cap",
          "url": "https://pokeapi.co/api/v2/pokemon/10160/"
          }
          },
          {
          "is_default": false,
          "pokemon": {
          "name": "pikachu-gmax",
          "url": "https://pokeapi.co/api/v2/pokemon/10199/"
          }
          }
          ]
      }
    }).as("pikachu");
    cy.visit("https://pokedexpokemon.netlify.app/");
    cy.contains("Pikachu")
      .parent()
      .parent()
      .within((element) => {
        cy.wrap(element).contains("Más detalles").click();
      });+
    cy.wait("@pikachu").then(interception=>{
      expect(interception.response.body).to.have.property("name","pikachu")
      expect(interception.response.statusCode).to.eq(200)
    })
  });
});

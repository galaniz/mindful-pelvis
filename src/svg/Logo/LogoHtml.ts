/**
 * Svg - logo html
 */

/* Imports */

import { configHtmlVars } from '../../config/configHtml'

/**
 * Function - output svg for logo
 *
 * @param {string} classes
 * @param {string} theme
 * @return {string} HTML - svg
 */

const LogoSvgHtml = (classes: string = '', theme: string = 'default'): string => {
  /* Add to svg sprite */

  const viewBox = '0 0 100 32.473'
  const id = 'logo'

  configHtmlVars.svg[id] = {
    viewBox,
    output: `
      <style>
        .mp-text {
          fill: var(--text, #333f48)
        }

        .mp-wave {
          fill: var(--wave, #3c6e89)
        }
        
        .mp-circle {
          fill: var(--circle, #333f48)
        }
        
        .mp-crest {
          fill: var(--crest, #6899ae)
        }
        
        .mp-greater {
          fill: var(--greater, #6899ae)
        }
        
        .mp-lesser {
          fill: var(--lesser, #c07759)
        }

        path {
          transition: fill var(--duration) var(--easing);
        }
      </style>
      <path
        d="M16.236,32.473c8.967,0,16.236-7.269,16.236-16.236S25.204,0,16.236,0,0,7.269,0,16.236s7.269,16.236,16.236,16.236Z"
        class="mp-circle"
      />
      <path
        d="M7.068,9.785c1.646,2.426,.268,8.157-.288,9.515-.794,1.94-3.302,2.469-5.529,3.195-.805-1.926-1.251-4.04-1.251-6.259,0-3.111,.875-6.017,2.393-8.487,1.668,.061,3.872,.852,4.675,2.035h0Z" class="mp-greater"/><path d="M9.287,25.064c.397,.856,.177,3.79-.913,5.381-2.24-1.242-4.156-2.998-5.587-5.11,.071-.046,.146-.092,.226-.137,1.35-.75,5.242-2.357,6.274-.134h0Z"
        class="mp-lesser"
      />
      <path
        d="M12.64,32.091l-.227-.087c.362-.941,.568-2.12,.767-3.26,.13-.745,.265-1.515,.441-2.207,.864-3.385,1.263-3.952,2.226-5.323,.164-.234,.345-.491,.548-.79,.773-1.14,1.357-2.88,.918-3.859-.184-.411-.538-.655-1.053-.724-1.388-.187-1.97-.963-1.922-1.605,.048-.65,.715-1.301,2.109-1.278,.266,.004,.525,.012,.777,.02,2.011,.065,3.601,.116,5.308-2.34,1.104-1.589,1.175-3.457,.942-5.774-.037-.362-.134-.834-.228-1.291-.182-.882-.354-1.716-.185-2.073l.22,.104c-.135,.284,.045,1.153,.203,1.919,.096,.463,.194,.941,.232,1.316,.207,2.051,.23,4.189-.984,5.937-1.783,2.564-3.432,2.511-5.516,2.444-.251-.008-.508-.016-.773-.02-.02,0-.039,0-.059,0-1.192,0-1.766,.525-1.805,1.053-.039,.532,.48,1.18,1.712,1.346,.604,.081,1.022,.372,1.243,.866,.479,1.071-.109,2.871-.939,4.095-.204,.3-.385,.559-.55,.794-.945,1.345-1.337,1.901-2.19,5.243-.174,.684-.308,1.449-.437,2.189-.201,1.151-.409,2.342-.78,3.305h0Z"
        class="mp-crest"
      />
      <path
        d="M39.372,4.967v-.347h2.535v.347h-1.159l.091-.093v3.002h-.404v-3.002l.091,.093h-1.154Zm4.127-.347h.404v1.436h1.613v-1.436h.399v3.256h-.399v-1.473h-1.613v1.473h-.404v-3.256h0Zm4.5,3.256v-3.256h2.007v.347h-1.602v1.094h1.509v.347h-1.509v1.115h1.602v.353h-2.007Z"
        class="mp-text"
      />
      <path
        d="M70.876,29.576v-4.818h1.489c.524,0,.92,.133,1.19,.4,.27,.267,.404,.622,.404,1.066,0,.438-.135,.789-.404,1.054-.27,.264-.666,.397-1.19,.397h-.999v1.902h-.49Zm.49-2.322h.999c.36,0,.634-.091,.821-.272,.187-.184,.28-.437,.28-.758,0-.324-.093-.581-.28-.77-.187-.189-.46-.284-.821-.284h-.999v2.084h0Zm5.292,2.322v-4.818h2.917v.412h-2.434v1.766h2.294v.412h-2.294v1.808h2.434v.42h-2.917Zm6.337-4.818v4.398h2.221v.42h-2.703v-4.818h.482Zm5.588,4.317l1.509-4.317h.517l-1.746,4.818h-.494l-1.734-4.818h.513l1.505,4.317h-.07Zm4.53,.502v-4.818h.482v4.818h-.482Zm5.137,.086c-.316,0-.607-.057-.871-.171-.262-.117-.473-.286-.634-.509-.158-.226-.239-.499-.241-.821h.467c0,.241,.058,.44,.175,.595,.119,.156,.275,.271,.467,.346,.194,.075,.404,.113,.63,.113,.257,0,.477-.041,.661-.124,.184-.086,.325-.196,.424-.331,.099-.137,.148-.285,.148-.443,0-.223-.069-.405-.206-.545-.135-.143-.33-.254-.587-.334l-.813-.264c-.412-.142-.722-.303-.929-.482-.207-.181-.311-.437-.311-.766,0-.365,.139-.665,.416-.898,.28-.233,.68-.35,1.202-.35,.472,0,.841,.109,1.108,.327,.27,.215,.425,.499,.467,.852h-.478c-.042-.236-.154-.417-.338-.544-.182-.13-.434-.194-.758-.194-.347,0-.617,.079-.809,.237-.189,.156-.284,.354-.284,.595,0,.194,.06,.349,.179,.463,.122,.114,.311,.214,.568,.3l.976,.319c.34,.106,.612,.262,.817,.467,.205,.205,.307,.476,.307,.813,0,.241-.066,.465-.198,.673-.132,.205-.329,.369-.591,.494-.259,.124-.579,.187-.961,.187h0Z"
        class="mp-text"
      />
      <path
        d="M45.777,20.342c-.089,0-.128-.039-.117-.117,.011-.033,.028-.094,.05-.184,.033-.089,.05-.245,.05-.467v-3.455c0-.823-.039-1.513-.117-2.069-.078-.556-.256-1.012-.534-1.369-.278-.356-.695-.534-1.252-.534-.401,0-.779,.172-1.135,.517-.356,.334-.651,.785-.885,1.352-.234,.567-.373,1.18-.417,1.836v3.722c0,.2,.017,.35,.05,.451,.044,.089,.072,.156,.083,.2v.033c0,.056-.039,.083-.117,.083h-1.302c-.089,0-.128-.039-.117-.117,.011-.044,.033-.111,.067-.2,.045-.1,.067-.25,.067-.451v-7.394c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.134-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v.918c.289-.534,.645-.946,1.068-1.235,.434-.3,.901-.451,1.402-.451,.723,0,1.324,.184,1.802,.551,.479,.356,.829,.868,1.051,1.535,.267-.645,.634-1.151,1.102-1.519,.479-.378,.996-.568,1.552-.568,1.057,0,1.847,.367,2.37,1.102,.534,.723,.801,1.702,.801,2.937v3.672c0,.223,.011,.378,.033,.467,.033,.089,.056,.15,.067,.184v.033c0,.056-.039,.083-.117,.083h-1.235c-.089,0-.128-.039-.117-.117,.011-.033,.028-.094,.05-.184,.033-.089,.05-.245,.05-.467v-3.455c0-.823-.045-1.513-.134-2.069-.078-.556-.256-1.012-.534-1.369-.278-.356-.701-.534-1.268-.534-.378,0-.734,.156-1.068,.467-.334,.3-.618,.712-.851,1.235-.222,.523-.362,1.09-.417,1.702v4.022c0,.223,.011,.378,.033,.467,.033,.089,.056,.15,.067,.184v.033c0,.056-.039,.083-.117,.083h-1.235Zm10.885,.134c-.534,0-.907-.212-1.118-.634-.2-.434-.3-1.035-.3-1.802v-5.858c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.133-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v6.559c0,.3,.05,.545,.15,.734,.1,.178,.222,.267,.367,.267,.122,0,.234-.078,.334-.234,.022-.033,.045-.05,.067-.05h.1c.022,0,.033,.017,.033,.05-.156,.345-.456,.518-.901,.518h0Zm-1.485-10.214c0-.189,.067-.35,.2-.484,.145-.145,.312-.217,.501-.217,.2,0,.367,.072,.501,.217,.145,.134,.217,.295,.217,.484,0,.2-.072,.373-.217,.517-.133,.134-.3,.2-.501,.2-.189,0-.356-.067-.501-.2-.133-.144-.2-.317-.2-.517h0Zm10.795,10.081c-.089,0-.128-.039-.117-.117,.011-.033,.028-.094,.05-.184,.033-.089,.05-.245,.05-.467v-3.455c0-.812-.05-1.496-.15-2.053-.1-.556-.323-1.012-.668-1.369-.334-.367-.829-.551-1.485-.551-.523,0-.99,.178-1.402,.534-.401,.356-.718,.829-.951,1.419-.234,.59-.373,1.224-.417,1.903v3.572c0,.2,.017,.35,.05,.451,.044,.089,.072,.156,.083,.2v.033c0,.056-.039,.083-.117,.083h-1.302c-.089,0-.128-.039-.117-.117,.011-.044,.033-.111,.067-.2,.044-.1,.067-.25,.067-.451v-7.394c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.134-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v.985c.311-.545,.712-.974,1.202-1.285,.489-.311,1.024-.467,1.602-.467,1.191,0,2.075,.351,2.654,1.052,.59,.701,.884,1.697,.884,2.987v3.672c0,.223,.011,.378,.033,.467,.033,.089,.056,.15,.067,.184v.033c0,.056-.039,.083-.117,.083h-1.235Zm7.46,.134c-.812,0-1.535-.178-2.17-.534-.634-.356-1.129-.851-1.485-1.485-.356-.645-.534-1.38-.534-2.203,0-.812,.189-1.552,.567-2.22,.378-.679,.896-1.213,1.552-1.602,.668-.389,1.413-.584,2.236-.584,1.035,0,1.891,.278,2.57,.835V7.424c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.133-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v11.315c0,.3,.05,.545,.15,.734,.1,.178,.223,.267,.367,.267,.122,0,.234-.078,.334-.234,.022-.033,.044-.05,.067-.05h.1c.022,0,.033,.017,.033,.05-.156,.345-.456,.517-.901,.517-.645,0-1.068-.351-1.268-1.052-.812,.701-1.775,1.052-2.887,1.052h0Zm-2.937-4.623c0,.812,.139,1.547,.417,2.203,.289,.657,.679,1.168,1.168,1.535,.501,.367,1.051,.551,1.652,.551,.59,0,1.107-.189,1.552-.567,.456-.389,.751-.901,.885-1.535v-3.688c-.245-.668-.623-1.196-1.135-1.585-.501-.389-1.079-.584-1.736-.584-.556,0-1.046,.161-1.469,.484-.423,.323-.751,.768-.985,1.335-.234,.556-.351,1.174-.351,1.853h0Zm10.601,4.456c-.089,0-.128-.039-.117-.117,.011-.044,.033-.111,.067-.2,.045-.1,.067-.25,.067-.451v-7.36h-.868v-.184h.868v-1.035c0-1.335,.228-2.331,.684-2.987,.456-.656,1.146-.985,2.07-.985,.59,0,1.085,.128,1.485,.384,.412,.256,.668,.601,.768,1.035,.022,.134,.033,.223,.033,.267,0,.211-.067,.384-.2,.517-.134,.123-.284,.184-.451,.184-.156,0-.284-.05-.384-.15-.1-.111-.145-.267-.133-.467,.022-.501-.067-.873-.267-1.118-.2-.245-.484-.367-.851-.367-.601,0-1.001,.312-1.202,.935-.189,.623-.284,1.541-.284,2.754v1.035h2.22v.184h-2.22v7.36c0,.2,.017,.351,.05,.451,.045,.089,.072,.156,.083,.2v.033c0,.056-.039,.083-.117,.083h-1.302Zm8.948,.167c-1.235,0-2.153-.334-2.754-1.002-.59-.679-.885-1.686-.885-3.021v-4.273c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.133-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v3.471c0,1.257,.161,2.259,.484,3.004,.323,.734,.974,1.102,1.953,1.102,.69,0,1.257-.228,1.702-.684,.445-.467,.768-1.085,.968-1.853v-5.491c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.133-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v6.559c0,.3,.05,.545,.15,.734,.1,.178,.222,.267,.367,.267,.122,0,.234-.078,.334-.234,.022-.033,.044-.05,.067-.05h.1c.022,0,.033,.017,.033,.05-.156,.345-.456,.518-.901,.518-.356,0-.645-.134-.868-.401-.223-.278-.378-.645-.467-1.102-.312,.479-.707,.851-1.185,1.118-.478,.256-1.024,.384-1.635,.384h0Zm8.57,0c-.534,0-.907-.212-1.118-.634-.2-.434-.3-1.035-.3-1.802V7.424c0-.044,.017-.083,.05-.117,.033-.044,.078-.067,.134-.067,.245,.011,.484,.078,.718,.2,.245,.111,.367,.256,.367,.434v11.315c0,.3,.05,.545,.15,.734,.1,.178,.223,.267,.367,.267,.123,0,.234-.078,.334-.234,.022-.033,.045-.05,.067-.05h.1c.022,0,.033,.017,.033,.05-.156,.345-.456,.517-.901,.517h0Z"
        class="mp-text"
      />
      <path
        d="M66.591,27.671c-1.139,0-1.717-.33-2.275-.649-.555-.317-1.079-.617-2.154-.617s-1.599,.3-2.154,.617c-.558,.319-1.135,.649-2.275,.649s-1.717-.33-2.275-.649c-.555-.317-1.079-.617-2.154-.617s-1.599,.3-2.154,.617c-.558,.319-1.135,.649-2.275,.649s-1.714-.33-2.272-.65c-.552-.316-1.074-.615-2.138-.615h-.021c-1.123,.004-1.643,.306-2.194,.626-.541,.314-1.1,.639-2.232,.639-.067,0-.121-.054-.121-.122s.055-.122,.121-.122c1.067,0,1.574-.294,2.11-.606,.554-.322,1.127-.655,2.315-.659h.021c1.129,0,1.704,.329,2.259,.647,.555,.318,1.079,.618,2.151,.618s1.599-.3,2.154-.617c.558-.319,1.135-.649,2.275-.649s1.717,.33,2.275,.649c.555,.317,1.079,.617,2.154,.617s1.599-.3,2.154-.617c.558-.319,1.135-.649,2.275-.649s1.717,.33,2.275,.649c.555,.317,1.079,.617,2.154,.617,.067,0,.121,.055,.121,.122s-.054,.122-.121,.122h0Z"
        class="mp-wave"
      />
    `
  }

  /* Output */

  return `
    <svg
      width="100"
      height="32.473"
      aria-hidden="true"
      focusable="false"
      role="img"
      data-theme="${theme}"
      ${classes !== '' ? ` class="${classes}"` : ''}
    >
      <use xlink:href="#${id}" />
    </svg>
  `
}

/* Exports */

export { LogoSvgHtml }

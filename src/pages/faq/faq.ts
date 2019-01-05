import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import {ENV} from '../../app/env'

/*
  Generated class for the FAQ page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FAQPage {
	qus;
  value;
  link=ENV.api+"/webservicefaqs";
  http;
  constructor(http:Http,public navCtrl: NavController, public navParams: NavParams) {
  	this.qus=[];
    this.http=http;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FAQPage');
    this.qus=[
          {
          question:"Qu'est-ce que Oolaga ?",
          answer:'Pensez à Oolaga comme votre concierge chargé des déménagements, des livraisons et du transport d’objets volumineux. Nous vous mettons en relation avec les propriétaires d’utilitaires de votre région (appelés "Helpers" ou "Jobeurs") qui sont prêts à répondre à vos besoins de déménagement, de livraison et de transport.'
          },
          {
          question:"Qui sont les Helpers Oolaga ?",
          answer:"Chaque Helper Oolaga est un particulier / auto-entrepreneur dont les antécédents sont vérifiés par Oolaga et qui est évalué et examiné en permanence par les autres clients d'Oolaga. Nous essayons de travailler uniquement avec les meilleurs Helpers, capables de fournir un niveau de service incroyablement élevé et nous portons une attention particulière à leurs évaluations afin de garantir un service 5 étoiles."
          },
          {
          question:"Quelles régions sont couvertes par Oolaga ?",
          answer:"Nous lançons notre service dans les Bouches-du-Rhône et prévoyons de nous développer très prochainement dans toute la France!"
          },
          {
          question:"Y’a-t-il des restrictions en termes d’horaires ?",
          answer:"Les notifications peuvent arriver tous les jours et à tout moment de la journée. Cependant un Oolaga ne peut être effectué que durant la plage horaire allant de 7h00 à 20h00."
          },
          {
          question:"Combien coûte un Oolaga ?",
          answer:'Tout dépend de votre budget! Vous choisissez le prix que vous souhaitez payer pour que vos objets soient transportés et un "Helper" de votre région vous répondra avec une offre ou une contre-offre. Pour maximiser vos chances de recevoir des offres, il est recommandé de:Fournir des photos et de décrire en détail ce que vous souhaitez déménager ou transporter De choisir un budget adapté au nombre et au type d\'objet à déplacer, au nombre de Helpers / Jobeurs requis, à la distance entre l\'enlèvement et la livraison.'
          },
          {
          question:'Quelle est la différence entre l’option "Pas-de-porte" et "A l’intérieur" ?',
          answer:'En cochant l’option "A l’intérieur" votre Helper ira récupérer votre objet à l’intérieur de l’adresse choisie et le déposera chez vous dans une pièce de votre choix. Si vous choisissez l’option "Pas-de-porte", votre Helper récupèrera votre objet à l’extérieur de l’adresse choisie et le livrera sur vos pas-de-porte. Vous êtes responsable de le déplacer à l’intérieur de votre domicile / lieu de travail.'
          },
          {
          question:"Puis-je changer l'heure et la date de mon Oolaga ?",
          answer:"Vous ne pouvez pas modifier l'heure et la date d'un Oolaga déjà attribué à un Helper."
          },
		  {
          question:"Quand est-ce que mon Oolaga arrivera ?",
          answer:"Votre Oolaga arrivera dans la plage horaire que vous avez choisie dans l'application. Vous pouvez planifier un Oolaga jusqu'à 30 jours à l'avance ou demander de l’aide le jour même, en fonction de la disponibilité des Helpers dans votre région."
          },
		  {
          question:"Dois-je attendre au point de collection ?",
          answer:"Non, en fait, mieux vaut rentrer chez vous et vous détendre en attendant que votre Oolaga arrive avec vos objets! S'il s'agit d'un achat en magasin, partagez simplement le reçu avec votre Helper via l’application et n’oubliez d’informer le magasin qu’une tierce personne viendra les récupérer pour vous."
          },
		   {
          question:"La plateforme Oolaga peut-elle m'aider à trouver des Helpers qui m’aideront à déplacer des objets chez moi / au bureau ou de la rue à mon domicile ?",
          answer:'Oui notre application est conçue pour ce genre de besoins! Lorsque vous créez votre Oolaga, il vous suffit de choisir soit la catégorie "Main-d’œuvre seulement" ou une autre avec une collection et livraison à la même adresse.'
          },
		    {
          question:"Puis-je utiliser la plateforme Oolaga pour déposer des objets à la déchèterie de ma ville ?",
          answer:'Oui nous avons une catégorie dédiée à ce genre de demande. Vous devrez saisir l’adresse de la déchèterie dans l’adresse de livraison et d\'ajouter les détails nécessaires dans la zone de description (Type d\’encombrants, déchets…). Assurez-vous que votre budget inclut tous les frais si le service n\’est pas gratuit et gardez à l\’esprit que les déchèteries possèdent des horaires très strictes.'
          },
		   {
          question:"Puis-je donner un pourboire à un Helper ?",
          answer:'Bien que ce soit une démarche facultative (bien que très apprécié des Helpers), il est tout à fait possible de laisser un pourboire une fois que votre Oolaga est terminée. Les Helpers reçoivent 100% du pourboire et leur montant est ajouté au coût de votre Oolaga.'
          },
		  {
          question:"Y a-t-il des frais d'annulation ?",
          answer:'Si vous annulez votre Oolaga avec un préavis de plus de 24 heures, vous n’aurez aucune pénalité. Si vous annulez entre 24 heures et 1h avant le lancement de votre Oolaga et qu\'un Helper est programmé, des frais d\'annulation de 25% seront appliqués. Dans le cas où vous annulez une heure avant que votre Oolaga ne demarre et / ou que votre Helper soit déjà arrivé sur les lieux et qu’il ne puisse pas terminer votre Oolaga pour cause d\'annulation ou pour toute autre raison hors de son contrôle, des frais d\'annulation de 50% seront appliqués. Des exceptions seront faites si une preuve de « force majeure » est fournie. Dans tous les cas, nous vous suggérons de nous contacter au plus vite si vous souhaitez annuler à assistance@oolaga.fr'
          },
		  {
          question:"Comment puis-je communiquer avec mon Helper / Jobeur ?",
          answer:'Une fois que votre Oolaga est assigné à un Helper, vous avez la possibilité de communiquer avec lui a travers la messagerie instantanée de l’application. Si vous avez besoin de régler certains détails à l\'avance, veuillez nous envoyer un email à assistance@oolaga.fr'
          },
		  {
          question:"Les Helpers vont-ils emballer mes cartons ?",
          answer:'Les Helpers n\'emballent pas vos cartons et ils n’ont pas vocations à le faire. Cette tâche vous incombe et tout devrait être emballé et prêt au transport à leur arrivée.'
          },
		  {
          question:"Les Helpers / Jobeurs peuvent-ils démonter ou assembler des meubles ?",
          answer:'C’est une tâche qui peut être assignée à un Jobeur si vous l’avez mentionné dans la description de votre Oolaga. Dans le cas des Helpers, ils peuvent être amené à enlever des pièces pour qu’un objet passe à travers des portes ou des couloirs étroits, tout comme dévisser les pieds sur un canapé. Toutefois, ce service ne s’applique pas au démontage ni à l’assemblage complet de meubles type IKEA.'
          },
		  {
          question:"Est-ce que je peux utiliser la plateforme Oolaga pour m’aider à transporter des appareils électroménagers volumineux type réfrigérateur ou machine à laver ?",
          answer:'Absolument !'
          },
		  {
          question:"J'ai besoin de deplacer un piano, Oolaga peut-il m'aider ?",
          answer:'Malheureusement, les pianos font partis des objets prohibés sur notre plateforme. Ce genre de biens de valeur nécessitent une logistique particulière que nos Helpers ne peuvent vous fournir.'
          },
		  {
          question:"Puis-je monter dans le même véhicule que le Helper ?",
          answer:'Actuellement, nous n\'autorisons pas le covoiturage sur notre système.'
          },
		  {
          question:"Que se passe-t-il si mon Jobeur termine son Oolaga avant le nombre d’heures réservées ?",
          answer:'Pour compenser équitablement les Jobeurs qui se sont engagés dans le bloc horaire demandé, un client ne peut réduire ou modifier son Oolaga si celui-ci se termine plus tôt que prévu.'
          },
		  {
          question:"Comment dois-je décrire un lit à transporter ?",
          answer:'Entrez "Lit" dans l\'article à déplacer et toutes les pièces incluses dans la zone de description ou comme article supplémentaire pour chacune des parties de votre lit individuellement, c\'est à vous de choisir!'
          },
		  {
          question:"Et si un objet ne rentre pas chez moi ?",
          answer:'Si votre objet ne peut pas être livré parce qu’il ne passe pas à travers la porte, votre Helper peut le laisser à l’extérieur de votre domicile ou le retourner à l’enlèvement pour un supplément à votre charge. Il est vivement recommandé de prendre les mesures appropriées pour toutes les entrées de porte, couloirs et autres espaces sur le parcours de la livraison afin de vous assurer que les objets passeront sans encombre avant de réserver un Oolaga.'
          },
		  {
          question:"Que se passe-t-il si mes articles sont endommagés pendant l'Oolaga ? Mes articles sont-ils assurés pendant le transport ?",
          answer:'Les Helpers sont entièrement responsables des éventuels dommages survenus à vos objets. Nous ne proposons pas encore d\'assurance, mais nous travaillons actuellement à ajouter cette option dans un avenir très proche. Veuillez nous contacter à assistance@oolaga.fr pour toutes questions relatives aux dommages d’objets.'
          },
		  {
          question:"Comment puis-je devenir un Helper / Jobeur ?",
          answer:'Vous pouvez faire votre demande ici.'
          },
		  
		  ]
    this.http.get(this.link).subscribe(data=>{
      if(JSON.parse(data._body).response=true){
        console.log(JSON.parse(data._body))
      }
    })
  }
  enable(value){
    this.value=value;
  }

}

import styles from 'styles/Embed.module.css'

import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'
import TimeAgo from 'components/TimeAgo'
import { getPartialVacunationPopulation, getCompleteVacunationPopulation } from 'services/getProgressCalculations'

export default function Embed ({ data, info, totalPopulation }) {
  const totals = data.find(({ ccaa }) => ccaa === 'Totales')

  return (
    <>
      <div className={styles.embedContainer}>

        <div className={styles.card}>
          <img
            className={styles.cardImage}
            src='/mapa.png'
            alt='Vacunas distribuidas en España'
            width={150}
            height={150}
          />
          <section>
            <div>
              <h3>Dosis distribuidas:</h3>
              <p>
                <NumberDigits>{totals.dosisEntregadas}</NumberDigits>
              </p>
            </div>
            <p>Es el <strong><NumberPercentage>{totals.dosisEntregadas / totalPopulation}</NumberPercentage></strong> del total de España</p>
          </section>
        </div>

        <div className={styles.card}>
          <img
            src='/vacuna.png'
            alt='Vacunas administradas en España'
            width={150}
            height={150}
          />
          <section>
            <div>
              <h3>Dosis administradas:</h3>
              <p>
                <NumberDigits>{totals.dosisAdministradas}</NumberDigits>
              </p>
            </div>
            <p>
              Supone que el <strong><NumberPercentage>{getPartialVacunationPopulation(totals)}</NumberPercentage></strong> del total de España ha recibido al menos una dosis<br />Es el <strong><NumberPercentage>{totals.porcentajeEntregadas}</NumberPercentage></strong> sobre las vacunas distribuidas
            </p>
          </section>
        </div>

        <div className={styles.card}>
          <img
            src='/vacunas-completas.png'
            alt='Dosis completas subministradas'
            width={150}
            height={150}
          />
          <section>
            <div>
              <h3>Pauta completa:</h3>
              <p>
                <NumberDigits>{totals.dosisPautaCompletada}</NumberDigits>
              </p>
            </div>
            <p>
              Personas que están totalmente vacunadas<br />
              Supone el <strong><NumberPercentage>{getCompleteVacunationPopulation(totals)}</NumberPercentage></strong> del total de España<br />Suponen un <strong><NumberPercentage>{totals.dosisPautaCompletada / totals.dosisAdministradas}</NumberPercentage></strong> de las dosis administradas
            </p>
          </section>
        </div>

        <small className={styles.description}>
          Desarrollado por <strong><a href='https://midu.dev' target='_blank' rel='noopener noreferrer'>midudev</a></strong>
        </small>

        <small className={styles.by}>
          <a href='https://covid-vacuna.app' target='_blank' rel='nofollow noreferrer'><strong>covid-vacuna.app</strong></a> - Datos actualizados <TimeAgo timestamp={info.lastModified} />
        </small>

      </div>
    </>
  )
}

export async function getStaticProps () {
  const data = require('../public/data/latest.json')
  const info = require('../public/data/info.json')
  const { population: { Totales } } = require('../public/data/bbdd.json')

  return {
    props: {
      data,
      info,
      totalPopulation: Totales
    }
  }
}

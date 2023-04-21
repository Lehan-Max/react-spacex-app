export const GRAPHQL_API = "https://api.spacex.land/graphql/";

export const ROCKETS = `
{
    rockets {
      name
      id
    }
  }
`;

export const LAUNCHES_PAST = `
{
    launchesPast {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;

export const COMPANY_QUERY = `
{
  company {
    name
    summary
    founded
    ceo
  }
}
`;

export const GET_ROCKET_BY_ID_QUERY = `query Rocket($id: ID!){
  rocket(id: $id) {
    company
    country
    description
    first_flight
    name
    stages
    type
    wikipedia
    mass {
      kg
    }
    success_rate_pct
    active
    boosters
    cost_per_launch
    diameter {
      meters
    }
    first_stage {
      engines
      fuel_amount_tons
    }
  }
}
`;

export const GET_LAUNCH_BY_ID_QUERY = `
query Launch($id: ID!)
{
  launch(id: $id) {
    id
    is_tentative
    launch_date_utc
    launch_date_local
    launch_date_unix
    launch_site {
      site_name
      site_id
      site_name_long
    }
    launch_success
    launch_year
    links {
      video_link
      reddit_launch
      mission_patch
      mission_patch_small
    }
    mission_id
    mission_name
    tentative_max_precision
    upcoming
    static_fire_date_utc
    static_fire_date_unix
  }
}
`;
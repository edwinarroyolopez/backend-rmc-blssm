import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Character extends Model {
  public id!: number;
  public name!: string;
  public status!: string;
  public species!: string;
  public type!: string;
  public gender!: string;
  public origin!: string;
  public location!: string;
  public image!: string;
  public episode!: string[];
  public url!: string;
  public created!: string;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    species: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.JSONB,
    },
    location: {
      type: DataTypes.JSONB,
    },
    image: {
      type: DataTypes.STRING,
    },
    episode: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    url: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Character',
    tableName: 'characters',
    timestamps: false,
  }
);

export default Character;

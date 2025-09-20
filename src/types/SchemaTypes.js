/**
 * Vehicle interface
 * @interface
 * @extends Document
 */
function Hive() {
  /**
   * Hive number
   * @type {string}
   */
  this.beekeeper = "";

  /**
   * Hive type
   * @type {string}
   */
  this.hiveType = "";

  /**
   * Hive location
   * @type {string}
   */
  this.location = "";

  /**
   * Established year
   * @type {Date}
   */
  this.establishedYear = new Date();

  /**
   * Whether the hive is active
   * @type {boolean}
   */
  this.status = false;

  /**
   * Queen bee breed
   * @type {string}
   */
  this.queenStatus = "";

  /**
   * Availability of the hive
   * @type {boolean}
   */
  this.availability = true;

  /**
   * Products of the hive
   * @type {string}
   */
  this.products = "";

  /**
   * Population of the hive
   * @type {number}
   */
  this.population = 0;

  /**
   * Unique identifier for the hive
   * @type {string}
   */
  this.id = "";
}

/**
 * Beekeepers interface
 * @interface
 * @extends Document
 */
function Beekeepers() {
  /**
   * beekeeper number
   * @type {string}
   */
  this.no = "";

  /**
   * Date
   * @type {Date}
   */
  this.date = new Date();

  /**
   * First name of the beekeeper
   * @type {string}
   */
  this.firstName = "";

  /**
   * Last name of the beekeeper
   * @type {string}
   */
  this.lastName = "";

  /**
   * National ID card number of the beekeeper
   * @type {string}
   */
  this.nic = "";

  /**
   * Gender of the beekeeper
   * @type {string}
   */
  this.gender = "";

  /**
   * Date of birth of the beekeeper
   * @type {Date}
   */
  this.dob = new Date();

  /**
   * Contact number of the beekeeper
   * @type {string}
   */
  this.contactNo = "";

  /**
   * Email of the beekeeper
   * @type {string}
   */
  this.email = "";

  /**
   * Indicates whether the beekeeper is active
   * @type {boolean}
   */
  this.isActive = true;

  /**
   * Indicates whether the beekeeper is available
   * @type {boolean}
   */
  this.isAvailable = true;

  /**
   * ID of the beekeeper
   * @type {string}
   * */
  this.adminId = "";
}

/**
 * User interface
 * @interface
 * @extends Document
 */
function User() {
  /**
   * Fullname
   * @type {string}
   */
  this.fullname = "";

  /**
   * admin ID
   * @type {string}
   */
  this.adminId = "";

  /**
   * Email
   * @type {string}
   */
  this.email = "";

  /**
   * Password
   * @type {string}
   */
  this.password = "";
}

/**
 * Product interface
 * @interface
 * @extends Document
 */
function Product() {
  /**
   * Hive number
   * @type {string}
   */
  this.beekeeper = "";

  /**
   * Name of the product
   * @type {string}
   */
  this.productName = "";

  /**
   * Type of the product
   * @type {string}
   * @enum {["Honey", "Beeswax", "Propolis", "Royal Jelly", "Bee Pollen", "Other"]}
   */
  this.productType = "";

  /**
   * Optional details about product
   * @type {string}
   */
  this.description = "";

  /**
   * Numeric quantity
   * @type {number}
   */
  this.quantity = 0;

  /**
   * Unit of measurement
   * @type {string}
   * @enum {["kg", "g", "liters", "ml", "pieces"]}
   */
  this.unit = "kg";

  /**
   * Per unit price
   * @type {number}
   */
  this.price = 0;

  /**
   * When harvested
   * @type {Date}
   */
  this.harvestDate = new Date();

  /**
   * Optional expiry date if perishable
   * @type {Date}
   */
  this.expiryDate = new Date();

  /**
   * Quality grade of the product
   * @type {string}
   * @enum {["Premium", "Standard", "Organic", "Unspecified"]}
   */
  this.qualityGrade = "Unspecified";

  /**
   * Location of harvest
   * @type {string}
   */
  this.originLocation = "";

  /**
   * Percentage moisture (for honey)
   * @type {number}
   */
  this.moistureContent = 0;

  /**
   * Color of the wax (for beeswax)
   * @type {string}
   */
  this.waxColor = "";

  /**
   * Source of pollen
   * @type {string}
   */
  this.pollenSource = "";

  /**
   * Creation timestamp
   * @type {Date}
   */
  this.createdAt = new Date();

  /**
   * Last update timestamp
   * @type {Date}
   */
  this.updatedAt = new Date();
}

module.exports = {
  Hive: Hive,
  Beekeepers: Beekeepers,
  User: User,
  Product: Product,
};

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
    this.no = "";

    /**
     * Hive type
     * @type {string}
     */
    this.type = "";

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
    this.queenBreed = "";

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
     * Driver number
     * @type {string}
     */
    this.no = "";

    /**
     * Date
     * @type {Date}
     */
    this.date = new Date();

    /**
     * First name of the driver
     * @type {string}
     */
    this.firstName = "";

    /**
     * Last name of the driver
     * @type {string}
     */
    this.lastName = "";

    /**
     * National ID card number of the driver
     * @type {string}
     */
    this.nic = "";

    /**
     * Gender of the driver
     * @type {string}
     */
    this.gender = "";

    /**
     * Date of birth of the driver
     * @type {Date}
     */
    this.dob = new Date();

    /**
     * Contact number of the driver
     * @type {string}
     */
    this.contactNo = "";

    /**
     * Email of the driver
     * @type {string}
     */
    this.email = "";

    /**
     * License number of the driver
     * @type {string}
     */
    this.licenseNo = "";

    /**
     * License expiration date of the driver
     * @type {Date}
     */
    this.licenseExpireDate = new Date();

    /**
     * Medical issues of the driver
     * @type {string}
     */
    this.medicalIssues = "";

     /**
          * Indicates whether the passenger is active
          * @type {boolean}
          */
     this.isActive = true;

    /**
     * Indicates whether the driver is available
     * @type {boolean}
     */
    this.isAvailable = true;

    /**
     * Admin ID of the driver
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
Passenger interface
@interface
@extends Document
*/


function Passenger() {
    /**
    * Passenger's email
    * @type {string}
    */
    this.email = '';
   
   /**
    * Username
    * @type {string}
    */
   this.username = '';

   /**
    * Password
    * @type {string}
    */
   this.password = '';
   
   /**
    * Passenger's first name
    * @type {string}
    */
   this.firstName = '';


   /**
    * Passenger's last name
    * @type {string}
    */
   this.lastName = '';

   /**
    * Passenger's NIC number
    * @type {string}
    */
   this.nicNo = '';

    /**
    *Gender    
       * @type {string}
       */
    this.gender = '';
    
       /**
        * Passenger's date of birth
        * @type {Date}
        */
       this.dateOfBirth = new Date();

       /**
        * Passenger's contact number
        * @type {string}
        */
       this.contactNo = '';

       /**
        * Passenger's service number
        * @type {string}
        */
       this.serviceNo = '';

       /**
        * company name
        * @type {string}
        */
       this.companyName = '';

       /**
       * Indicates whether the passenger is internal or external
       * @type {boolean}
       */
       this.isInternal = false;
        

         /**
          * Indicates whether the passenger is active
          * @type {boolean}
          */
            this.isActive = true;



}



module.exports = {
    Hive: Hive,
    Beekeepers: Beekeepers,
    User: User,
    Passenger: Passenger

};
